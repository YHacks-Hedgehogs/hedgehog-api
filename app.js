const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

const applicationApproved = (application) => {
  const monthlyIntrestRate = application.intrestRate / 12;
  const termMonths = application.termLength;
  const payment = application.loanAmount * (monthlyIntrestRate * (1 + monthlyIntrestRate) ** termMonths) / ((1 + monthlyIntrestRate) ** termMonths - 1)
  if (application.income / 3 > payment) {
    return true;
  } else {
    return false;
  }
}

app.post('/apply', 
  (req, res) => {
    const application = {
      email: req.body.email,
      firstName: req.body.first,
      lastName: req.body.last,
      married: req.body.married,
      dependents: req.body.dependents,
      education: req.body.education,
      selfEmployed: req.body.selfEmployed,
      income: req.body.income,
      intrestRate: req.body.intrestRate,
      creditScore: req.body.creditScore,
      loanAmount: req.body.loanAmount,
      termLength: req.body.termLength,
    }
    console.log(applicationApproved(application));
    res.json({approved:applicationApproved(application)});
  }
);

app.listen(PORT, 
  () => {
    console.log(`Evently listening on http://localhost:${PORT}/`);
  }
);
