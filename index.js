const fs = require('fs');
const csvParser = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

class CSV {
    async read(filePath, delimiter = ',', callback = null) {
        const results = [];

        const readStream = fs.createReadStream(filePath).pipe(csvParser({ separator: delimiter }));

        await new Promise((resolve, reject) => {
            readStream
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    if (callback) {
                        callback(results, null);
                    } else {
                        resolve(results);
                    }
                })
                .on('error', (error) => {
                    if (callback) {
                        callback(null, error);
                    } else {
                        reject(error);
                    }
                });
        });

        if (!callback) {
            return results;
        }
    }

    async write(filePath, data, delimiter = ',', callback = null) {
        const csvWriter = createCsvWriter({
            path: filePath,
            header: Object.keys(data[0]).map((key) => ({ id: key, title: key })),
            fieldDelimiter: delimiter,
        });

        try {
            await csvWriter.writeRecords(data);
            if (callback) {
                callback(null);
            } else {
                return null;
            }
        } catch (error) {
            if (callback) {
                callback(error);
            } else {
                throw error;
            }
        }
    }
}

module.exports = new CSV;
