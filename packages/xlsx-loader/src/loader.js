import xlsx from 'xlsx';

/**
* Excel parser for Snitchy (gtm / analytics)
*
* @export
* @returns {source} map object
*/
export default function() {
  /* eslint-disable no-invalid-this */
  const workbook = xlsx.readFile(this.resourcePath);
  const variables = {};

  workbook.SheetNames
    .filter(sheetName => sheetName !== 'config')
    .forEach(sheetName => {
      const worksheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(worksheet);

      let currentName;
      let currentLayer;

      variables[sheetName] = {};

      data.forEach(row => {
        const { name, layer, event, key, value } = row;

        if (name) {
          currentName = name;
          variables[sheetName][currentName] = {};
        }
        if (layer) {
          currentLayer = layer;
          variables[sheetName][currentName][currentLayer] = {};
        }

        if (event) {
          variables[sheetName][currentName][currentLayer].event = event;
        }

        if (!variables[sheetName][currentName][currentLayer].data) {
          variables[sheetName][currentName][currentLayer].data = {};
        }

        variables[sheetName][currentName][currentLayer].data[key] = value;
      });
    });

  return `export default ${JSON.stringify(variables)}`;
}
