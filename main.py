from flask import Flask, render_template, url_for, request, redirect, Response

app = Flask(__name__)


@app.route("/")
def main_page():
    return render_template("main.html", result = url_for("deepClean"))

if __name__ == '__main__':
    app.run(host="0.0.0.0", port='5000', debug=True)