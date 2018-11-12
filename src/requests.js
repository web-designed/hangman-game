//*******************************************************
// get puzzle from an API
//*******************************************************

   export const getPuzzle = async (wordcount) => {
      const response = await fetch(`//puzzle.mead.io/puzzle/?wordCount=${wordcount}`)
      if (response.status === 200) {
         const data = await response.json()
         return data.puzzle
      } else {
         throw new Error('Unable to get puzzle')
      }
   }


//*******************************************************
// get current country you are playing from
//*******************************************************

   const getCountryCode = async (countryCode) => {
      const response = await fetch('https://restcountries.eu/rest/v2/all')
      if (response.status === 200) {
         const data = await response.json()
         const country = data.find((country) => country.alpha2Code === countryCode)
         if (country !== undefined) {
            return country.name   
         } else {
            throw new Error(`The CountryCode you provided <${countryCode}> doesnt match any country in the API`)
         }
      } else {
         throw new Error(`Couldnt connect to the API`)
      }
   }

   const getLocation = async () => {
      const response = await fetch('https://ipinfo.io/json?token=0b7b428888c419')
      if (response.status === 200) {
         return response.json()
      } else {
         throw new Error(`Couldnt connect to the API`)
      }
   }

   const getCurrentCountry = async () => {
      const location = await getLocation()
      return getCountryCode(location.country)
   }
