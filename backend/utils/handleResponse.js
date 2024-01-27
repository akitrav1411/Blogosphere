import { statusCodes, statusMessages } from "../config/index.js";

export const handleResponse = (...props) => {
  const [actionFunction, req, res] = props;
  return actionFunction(req, res)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      const {
        status = statusCodes.INTERNAL_SERVER_ERROR,
        message = statusMessages.SERVER_ERROR,
      } = error;
      res.status(status).send(JSON.stringify({ message }));
    });
};
