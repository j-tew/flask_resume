from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home/index.html')

@app.route('/calculator')
def calc():
    return render_template('calc/index.html')

@app.route('/wargame')
def war():
    return render_template('war/index.html')

@app.route('/test')
def test():
    return '<h1>Test Page</h1>'

if __name__ == '__main__':
    app.run()
