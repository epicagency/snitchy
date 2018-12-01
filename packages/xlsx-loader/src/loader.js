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
      const last = data.length - 1;

      let currentName;
      let currentLayer;
      let currentEvent = {};

      variables[sheetName] = {};

      data.forEach((row, i) => {
        const { name, layer, event, key, value } = row;

        // If previous event for previous layer, push it before new row
        if (currentEvent.event && layer && currentLayer !== layer) {
          variables[sheetName][currentName][currentLayer].push(currentEvent);
          currentEvent = {};
        }

        if (name) {
          currentName = name;
          variables[sheetName][currentName] = {};
        }
        if (layer) {
          currentLayer = layer;
          variables[sheetName][currentName][currentLayer] = [];
        }

        // If previous event for same layer, push it before new event
        if (currentEvent.event && event && currentEvent.event !== event) {
          variables[sheetName][currentName][currentLayer].push(currentEvent);
          currentEvent = {};
        }

        if (event) {
          // Set a new currentEvent
          currentEvent = {
            event,
            data: {
              [key]: value,
            },
          };
        }

        currentEvent.data[key] = value;

        // If existing event and last row, push it before end
        if (currentEvent.event && i === last) {
          variables[sheetName][currentName][currentLayer].push(currentEvent);
        }
      });
    });

  return `export default ${JSON.stringify(variables)}`;
}
