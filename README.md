# Pharma LRP

## System Dependencies

- Python 3.6.x
- Node 9.4.x
- Postgres 9.6.x or higher

## Setup

Once you have the system dependencies installed, use `./buildall && ./run` to start the server.

See https://innolitics.com/10x/best-practices/#standard-script-names for details.

Use `./test` to run the tests.

## Test Data

Admin username `admin`
Admin password `IaeaPLRP!`

## Adding Python dependencies

We use [pip-tools](https://github.com/jazzband/pip-tools/) to generate our pinned requirements file.

To add a python dependency, first add it to `requirements.in` and then run `pip-compile requirements.in > requirements.txt`.  Note that this could upgrade other packages, so you may need to selectively commit the parts you want.
