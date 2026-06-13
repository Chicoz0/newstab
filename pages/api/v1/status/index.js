function status(request, response) {
  response.status(200).json({ message: "Status ok!" });
}

export default status;