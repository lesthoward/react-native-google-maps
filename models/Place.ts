import { generateUnique } from '../utils/number';

export interface IPlace {
  title: string;
  imageUri: string;
  address: string;
  lat: number;
  lng: number;
  id?: string;
}

export default class Place implements IPlace {
  constructor(
    public title: string,
    public imageUri: string,
    public address: string,
    public lat: number,
    public lng: number,
    public id?: string
  ) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.lat = lat;
    this.lng = lng;
    this.id = id ? id : generateUnique();
  }
}
