# csv-rw
Easy-to-use CSV read-write Node.js module

The aim was to create the most easy-to-use CSV reader and writer possible.

## Functions

- `async read(filePath, delimiter = ',', callback = null)`, reads a CSV file and returns an array of objects with properties of the relevant row. Throws an error if error occured except if callback argument is defined: callback(data, error): if succeed error is null, if failed data is null.

- `async write(filePath, data, delimiter = ',', callback = null)`, writes an array of objects to a CSV file and returns null if succeed, throws an error if failed except when callback is defined: then the return value goes into callback's argument: null if succeed, error if error occured; it overrides the file if it is already exists at filePath.

## Install

> **npm i csv-rw**

## Usage

### Import csv-rw

```js
const csv = require('csv-rw')
```

### Write objects to CSV

```js
let car1 = {}
car1.model = 'Hummer H3'
car1.color = 'black'

let car2 = {}
car2.model = 'Toyota Corolla'
car2.color = 'white'

let cars = []
cars.push(car1)
cars.push(car2)

await csv.write('cars.csv', cars) // Default delimiter is ','
```

cars.csv will look like:

```csv
model,color
Hummer H3,black
Toyota Corolla,white
```

### Read CSV to objects

```js
cars = await csv.read('cars.csv') // Default delimiter is ','

for (const car of cars) {
    console.log("Model: " + car.model + ", Color: " + car.color)
}
```

output will be:

```
Model: Hummer H3, Color: black
Model: Toyota Corolla, Color: white
```

### Use custom delimiters

```js
let trucks = await csv.read('trucks.csv', ';')  // Custom delimiter is now ';'

await csv.write('trucks.csv', trucks, '#')  // Custom delimiter is now '#'
```

this will convert `;` delimiter to `#` in `trucks.csv`.

### Use callbacks

#### Read

```js
csv.read('cars.csv', ',', (cars, error) => {
    if (error) {
        console.log('Error reading cars.csv: ' + error)
    } else {
        for (const car of cars) {
            console.log("Model: " + car.model + ", Color: " + car.color)
        }
    }
})
```

#### Write

```js
csv.write('cars.csv', cars, ',', (error) => {
    if (error) {
        console.log('Error writing cars to cars.csv: ' + error)
    } else {
        console.log('Finished writing cars to cars.csv successfully')
    }
})
```

