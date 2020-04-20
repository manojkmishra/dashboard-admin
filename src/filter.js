import Vue from "vue";

// Format String to uppercase first letter
Vue.filter("toUpperCase", function(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
});

// Format Date
Vue.filter("myDate", function(created) {
  return moment(created).format("MMMM Do YYYY");
});

// Format String to uppercase first letter
Vue.filter("toUpperCase", function(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
});

// Format String to uppercase
Vue.filter("toUpperCaseAll", function(text) {
  return text.toUpperCase();
});

//To long Site name
Vue.filter("ToLongName", function(text) {
  switch (text) {
    case "gbg":
      return (text = "Geebung");
      break;
    case "moo":
      return (text = "Moonah");
      break;
    case "eli":
      return (text = "Elizabeth");
      break;
    case "lon":
      return (text = "Londsdale");
      break;
    case "smt":
      return (text = "Smithfield");
      break;
    case "tvl":
      return (text = "Townsville");
      break;
    case "new":
      return (text = "Newcastle");
      break;
    case "shp":
      return (text = "Shepparton");
      break;
    case "now":
      return (text = "Nowra");
      break;
    case "bay":
      return (text = "Bayswater");
      break;
    case "qbn":
      return (text = "Queanbeyan");
      break;
    case "wod":
      return (text = "Wodonga");
      break;
    case "ben":
      return (text = "Bendigo");
      break;
    case "bal":
      return (text = "Ballarat");
      break;
    case "crg":
      return (text = "Craigieburn");
      break;
    case "gel":
      return (text = "Geelong");
      break;
    case "wbl":
      return (text = "Warrnambool");
      break;
    case "lau":
      return (text = "Launceston");
      break;
    case "moo":
      return (text = "Moonah");
      break;
    case "tra":
      return (text = "Traralgon");
      break;
    case "per":
      return (text = "Perth");
      break;
    case "mld":
      return (text = "Mildura");
      break;
    case "knp":
      return (text = "Kunda Park");
      break;
    case "crn":
      return (text = "Cairns");
      break;
    default:
      return text;
  }
});
