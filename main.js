/*
  Import the ip-cidr npm package.
  See https://www.npmjs.com/package/ip-cidr
  The ip-cidr package exports a class.
  Assign the class definition to variable IPCIDR.
*/
const IPCIDR = require('ip-cidr');
const util = require('util')
const path = require('path');
const { getIpv4MappedIpv6Address } = require(path.join(__dirname, 'ipv6.js'));


class IpAddress {
  constructor() {
    // IAP's global log object is used to output errors, warnings, and other
    // information to the console, IAP's log files, or a Syslog server.
    // For more information, consult the Log Class guide on the Itential
    // Developer Hub https://developer.itential.io/ located
    // under Documentation -> Developer Guides -> Log Class Guide
    log.info('Starting the IpAddress product.');
  }

/**
 * @typedef {Object} IpAddress
 * @property {string} ipv4 - holds ipv4 address
 * @property {string} ipv6 - holds ipv6 address
 */
 

/**
 * Calculate and return the first host IP address from a CIDR subnet.
 * @param {string} cidrStr - The IPv4 subnet expressed
 *                 in CIDR format.
 * @param {callback} callback - A callback function.
 * @return {IpAddress} - Retunrs the object with ipv4 and ipv6 strings
 */
 getFirstIpAddress(cidrStr, callback) {

  // Initialize return arguments for callback
  let firstIpAddress = null;
  let callbackError = null;
  var IpAddress = {
            ipv4: null,
            ipv6: null
        };
  
  // Instantiate an object from the imported class and assign the instance to variable cidr.
  const cidr = new IPCIDR(cidrStr);
  // Initialize options for the toArray() method.
  // We want an offset of one and a limit of one.
  // This returns an array with a single element, the first host address from the subnet.
  const options = {
    from: 1,
    limit: 1
  };

  // Use the object's isValid() method to verify the passed CIDR.
  if (!cidr.isValid()) {
    // If the passed CIDR is invalid, set an error message.
    callbackError = 'Error: Invalid CIDR passed to getFirstIpAddress.';
  } else {
    // If the passed CIDR is valid, call the object's toArray() method.
    // Notice the destructering assignment syntax to get the value of the first array's element.
    [firstIpAddress] = cidr.toArray(options);
    let ipv6Addr = getIpv4MappedIpv6Address(firstIpAddress);
    IpAddress.ipv6 = ipv6Addr;
    IpAddress.ipv4 = firstIpAddress;
  }
  // Call the passed callback function.
  // Node.js convention is to pass error data as the first argument to a callback.
  // The IAP convention is to pass returned data as the first argument and error
  // data as the second argument to the callback function.
  return callback(IpAddress, callbackError);
}

}


module.exports = new IpAddress;