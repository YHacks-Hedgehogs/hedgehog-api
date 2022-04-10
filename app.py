from flask import Flask, jsonify, request
from flask_cors import CORS
import pickle
import numpy as np

model = pickle.load(open('modl.sav', 'rb'))


app = Flask(__name__)
CORS(app)

@app.route('/apply', methods=['POST'])
def apply():
  body = request.json

  if int(body['creditScore']) > 720:
    credit_history = body['creditScore']
  else:
    credit_history = 0
  
  if body['dependents'] == '3+':
    dependents = 3
  else:
    dependents = int(body['dependents'])
  
  data = np.array([np.log(float(body['income'])), np.log(float(body['loanAmount'])), credit_history, dependents, 2, np.log(int(body['termLength']))]).reshape(1, -1)
  result = model.predict(data)
  if result[0] == 1:
    return jsonify({"approved": True})
  
  return jsonify({"approved": False})

if __name__ == '__main__':
  app.run(port=4000, host='0.0.0.0')
