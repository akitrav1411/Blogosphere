import { statusMessages } from "../config/index.js";
import { Tag } from "../models/index.js";

const getSampleTags = async (req, res) => {
  try {
    const allTags = await Tag.find({});
    return allTags;
  } catch (error) {
    console.log(err, statusMessages.TAGS_FAILURE);
    throw error;
  }
};
export { getSampleTags };
