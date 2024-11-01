import Publisher from "../models/Publisher.js";

export const getAllPublishers = async () => {
  return await Publisher.find({});
};

export const getPublisherById = async (id) => {
  return await Publisher.findById(id);
};

export const createPublisher = async (data) => {
  const newPublisher = new Publisher(data);
  return await newPublisher.save();
};

export const updatePublisher = async (id, data) => {
  return await Publisher.findByIdAndUpdate(id, data, { new: true });
};

export const deletePublisher = async (id) => {
  return await Publisher.findByIdAndDelete(id);
};
