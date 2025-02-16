

exports.processMessage = async (req, res) => {
  try {

    // INPUTS DATAS
    prompt = req.body.text;

    // Return function
    res.json(prompt);

  } catch (err) {
    res.status(500).json({ error: error.message })
  }
};