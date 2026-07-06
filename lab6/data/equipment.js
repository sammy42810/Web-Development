//Export the following functions using ES6 Syntax

const createEquipmentItem = async (
  name,
  category,
  location,
  notes,
  asset
) => {};

const getAllEquipmentItems = async () => {};

const getEquipmentById = async (id) => {};

const removeEquipmentItem = async (id) => {};

const patchEquipmentItem = async (equipmentId, updateObject) => {};

const checkoutEquipmentItem = async (
  equipmentId,
  borrowerName,
  borrowerEmail,
  dueOn,
  notes
) => {};

const checkinEquipmentItem = async (checkoutId, returnedOn) => {};

const overdueEquipmentItems = async () => {};

const updateEquipmentLocation = async (id, newLocation) => {
  //not used for this assignment
};
