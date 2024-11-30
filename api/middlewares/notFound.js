export const notFound = (req, res, next) => {
  res.status(404).send({ message: "page not found try after again" });
};
