import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Router, RouterDocument } from './schema/router.schema';
import { Station, StationDocument } from '../station/schema/station.schema';

interface Position {
  x: number;
  y: number;
}

@Injectable()
export class RouterService {
  private adjacencyList = new Map<Station, Map<Station, number>>();

  constructor(
    @InjectModel(Router.name) private readonly routerModel: Model<RouterDocument>,
    @InjectModel(Station.name) private readonly stationModel: Model<StationDocument>,
  ) { }

  async create(router: Router): Promise<Router> {
    const createdRouter = new this.routerModel(router);
    return createdRouter.save();
  }

  async findAll(): Promise<Router[]> {
    return this.routerModel.find().exec();
  }

  async findOne(id: string): Promise<Router> {
    return this.routerModel.findById(id).exec();
  }

  async update(id: string, router: Router): Promise<Router> {
    return this.routerModel.findByIdAndUpdate(id, router, { new: true });
  }

  async remove(id: string): Promise<Router> {
    return this.routerModel.findByIdAndDelete(id);
  }

  async addStation(id: string, station: any): Promise<Router> {
    return this.routerModel.findByIdAndUpdate(id, { $push: { station: station } }, { new: true });
  }

  async buildGraph(): Promise<void> {
    const routers = await this.routerModel.find().populate('stations').exec();

    for (const router of routers) {
      for (const station of router.stations) {
        this.adjacencyList.set(station, new Map<Station, number>());

        for (const otherStation of router.stations) {
          if (station !== otherStation) {
            const distance = this.calculateDistance(station.positionx, station.positiony, otherStation.positionx, otherStation.positiony);

            this.adjacencyList.get(station).set(otherStation, distance);
          }
        }
      }
    }
  }

  async dijkstra(start: Station, end: Station): Promise<[Station[], number]> {
    if (!this.adjacencyList.size) {

      await this.buildGraph();
      console.log('Adjacency list:', this.adjacencyList);

    }

    const distances = new Map<Station, number>();
    const previous = new Map<Station, Station>();
    const priorityQueue = new Map<Station, number>();


    for (const station of this.adjacencyList.keys()) {
      distances.set(station, Infinity);

      previous.set(station, null);
    }

    distances.set(start, 0);
    priorityQueue.set(start, 0);

    while (priorityQueue.size > 0) {
      const currentStation = this.extractMin(priorityQueue);
      const neighbors = this.adjacencyList.get(currentStation);



      if (currentStation === end) {



        break;
      }


      if (neighbors) {
        console.log('Neighbors:', neighbors);
        for (const [neighbor, distance] of neighbors) {
          console.log('Processing neighbor:', neighbor);
          const totalDistance = distances.get(currentStation)! + distance;

          if (totalDistance < distances.get(neighbor)!) {
            distances.set(neighbor, totalDistance);
            previous.set(neighbor, currentStation);
            priorityQueue.set(neighbor, totalDistance);
          }
        }
      } else {
        console.log('No neighbors found for station:', currentStation);
        return [[], 0];
      }


      const path: Station[] = [];
      let current = end;
      while (current !== null) {
        path.unshift(current);
        current = previous.get(current);
      }

      return [path, distances.get(end)];
    }
  }
  private extractMin(priorityQueue: Map<Station, number>): Station {
    let minStation: Station = null;
    let minDistance = Infinity;

    for (const [station, distance] of priorityQueue) {
      if (distance < minDistance) {
        minStation = station;
        minDistance = distance;
      }
    }

    priorityQueue.delete(minStation);

    return minStation;
  }

  private calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }


  async findNearestRouter(position: Position): Promise<Router> {
    let nearestRouter: Router;
    let minDistance = Number.MAX_VALUE;

    const routers = await this.routerModel.find().populate('stations').exec();

    routers.forEach((router) => {
      router.stations.forEach((station) => {
        const distance = this.calculateDistance(
          position.x,
          position.y,
          station.positionx,
          station.positiony
        );
        if (distance < minDistance) {
          minDistance = distance;
          nearestRouter = router;
        }
      });
    });

    return nearestRouter;
  }


  async findNearestStation(userPosition: { x: number; y: number }): Promise<Station | null> {
    try {
      const stations = await this.stationModel.find().exec();

      if (!stations || stations.length === 0) {
        return null; // Return null if no stations are found
      }

      let nearestStation: Station | null = null;
      let minDistance = Infinity;

      for (const station of stations) {
        const distance = this.calculateDistance(
          userPosition.x,
          userPosition.y,
          station.positionx,
          station.positiony
        );
        if (distance < minDistance) {
          nearestStation = station;
          minDistance = distance;
        }
      }

      return nearestStation;
    } catch (error) {
      console.error('Error finding nearest station:', error);
      return null; // Return null in case of an error
    }
  }
}
