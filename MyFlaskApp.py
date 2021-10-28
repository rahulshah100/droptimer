from flask import Flask, render_template, request

app = Flask(__name__, template_folder='templates')


@app.route("/", methods=['GET','POST'])
def hello_world():
    # if request.method == 'POST':
    #     commenced_at = request.form.get('commenced_at')
    #     interval = request.form.get('interval')
    #     print(interval, commenced_at)
    return render_template('index.html')

@app.route("/about", methods=['GET','POST'])
def about():
    return render_template('about.html')

if __name__ == "__main__":
    app.run(debug=True)
