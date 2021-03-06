(function() {
  function Timeago() {
    function timeagoFilter(timestamp) {
      let periods = [
        {name: 'a moment', division: 60 * 1000}, 
        {name: 'minutes', division: 60}, 
        {name: 'hours', division: 24}, 
        {name: 'days', division: 7}, 
        {name: 'weeks', division: 4.333}, 
        {name: 'months', division: 31}, 
        {name: 'years', division: 12}];
      let smallestInt = Date.now() - timestamp;
      let period = periods.find( (p, i) => (smallestInt /= p.division) < 1 );
      let figure = period.name === 'a moment' ? 'just' : Math.floor(smallestInt * period.division);
      let periodName = figure === 1 ? period.name.replace(/s$/,'') : period.name;
      return `${figure} ${periodName} ago`;
    }
    
    timeagoFilter.$stateful = true;
    
    return timeagoFilter;
  }
  
  angular 
    .module('blocChat')
    .filter('timeago', Timeago);
  
})()