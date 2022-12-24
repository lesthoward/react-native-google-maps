import * as SQLite from 'expo-sqlite';
import Place from '../models/Place';

const db = SQLite.openDatabase('./places.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL)',
        [],
        (_, result) => {
          // console.log('Success creating table places', result);
          resolve(result);
        },
        (_, err): any => {
          // console.error('Error creating table places', err);
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertPlace = (place: Place) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)',
        [place.title, place.imageUri, place.address, place.lat, place.lng],
        (_, result) => {
          // console.log('Success inserting place', result);
          resolve(result)
        },
        (_, err): any => {
          // console.error('Error inserting place', err);
          reject(err)
        }
      );
    });
  });
  return promise;
}

export const fetchPlaces = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => resolve(result),
        (_, err): any => reject(err)
      );
    });
  });
}