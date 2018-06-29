// import moment from 'moment'; You can't do this or it will cause a stack-trace error

const moment = require.requireActual('moment');

export default (timestamp = 0) => {
    return moment(timestamp);
}