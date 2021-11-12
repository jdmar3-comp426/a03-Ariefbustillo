import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
function getAvgMpg() {
    let obj = {}

    let sumMPGC = 0
    let sumMPGH = 0
    mpg_data.forEach(o => {
        sumMPGC += o.city_mpg
        sumMPGH += o.highway_mpg
    })
    obj["city"] = sumMPGC / mpg_data.length
    obj["highway"] = sumMPGH / mpg_data.length

    return obj
};

function getAllYearStats() {
    let years = []
    mpg_data.forEach(o => {
        years.push(o.year)
    })
    return getStatistics(years)
};

function getRatioHybrids() {
    let sumH = 0
    mpg_data.forEach(o => {
        if(o.hybrid){
            sumH++;
        }
    })

    return sumH / mpg_data.length 
};

export const allCarStats = {
    avgMpg: getAvgMpg(),
    allYearStats: getAllYearStats(),
    ratioHybrids: getRatioHybrids(),
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */

 function getMakerHybrids() {
     let list = []
     mpg_data.forEach(o => {
        // console.log(o.make);
        // console.log(list);
        let done = false
        if(o.hybrid){
            
            list.forEach(obj => {
                // console.log(o.id)
                // console.log(obj.make)
                if(obj["make"] === o.make){
                    // console.log(o.make)
                    obj["hybrids"].push(o.id);
                    done = true

                }
                
            })
            if(done === false){
                // console.log(o.classification)
                let array = []
                array.push(o.id)

                let obj = {
                    "make": o.make,
                    "hybrids": array
                }

                list.push(obj)
        }

    }
     })

     list.sort(function(a,b) {
         return b["hybrids"].length - a["hybrids"].length  
     })
     return list
 };

 function getAvgMpgByYearAndHybrid(){
     var obj = {}
     mpg_data.forEach(o => {
         if(obj[o.year] === undefined){
            let city = [55]
            let highway = []
             obj[o.year] = {"hybrid": {"city": city, "highway": []}, "notHybrid": {"city": [], "highway": []}}

         }else{
             if(o.hybrid){
                 obj[o.year]["hybrid"]["city"].push(o.city_mpg)
                 obj[o.year]["hybrid"]["highway"].push(o.highway_mpg)

             }else{
                 obj[o.year]["notHybrid"]["city"].push(o.city_mpg);
                 obj[o.year]["notHybrid"]["highway"].push(o.highway_mpg)

             }
         }
     })

     for(const [key, value] of Object.entries(obj)){
        //  console.log(typeof(obj[key]["hybrid"]["city"]))
        //  console.log(obj[key]["hybrid"]["city"])
         obj[key]["hybrid"]["city"] = getStatistics(obj[key]["hybrid"]["city"]).mean
         obj[key]["hybrid"]["highway"] = getStatistics(obj[key]["hybrid"]["highway"]).mean
         obj[key]["notHybrid"]["city"] = getStatistics(obj[key]["notHybrid"]["city"]).mean
         obj[key]["notHybrid"]["highway"] = getStatistics(obj[key]["notHybrid"]["highway"]).mean
        //  console.log(obj[key]["notHybrid"]["city"])
        //  console.log(obj)
        
         


     }
    //  console.log(obj)
     return obj
 }
export const moreStats = {
    makerHybrids: getMakerHybrids(),
    avgMpgByYearAndHybrid: getAvgMpgByYearAndHybrid()

};
