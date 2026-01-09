export function mergeServerData<T extends { id: number | null}>(localData: T[], serverData: T[], initialData?: T[]) {
  const mergedData = new Array<T>();
  const serverDataMap = new Map(serverData.map((row) => [row.id, row]));
  const updatedRowsIds = new Set<number>();

  if (serverData.length === 0)
    return initialData ? [...initialData, ...localData] : localData;

  localData.forEach(row => {
    if (row.id === null) {
      mergedData.push(row);
    } else {
      if (serverDataMap.has(row.id)) {
        mergedData.push(row);
        updatedRowsIds.add(row.id);
      }
    }
  });

  serverData.forEach(row => {
    if (row.id && !updatedRowsIds.has(row.id)) {
      mergedData.push(row);
    }
  });

  return initialData ? [...initialData, ...mergedData] : mergedData; 
}