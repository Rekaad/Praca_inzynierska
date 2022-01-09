import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import OrlikiItemList from "../components/orliki/OrlikItemList";



const DUMMY_DATA = [
    {
        id: '1',
        title: 'pierwszy orlik',
        address: 'Wajdeloty 1',
        image:'https://bielsk.eu/images/stories/2020/05/maj2/12orlikorla.jpg',
        description: 'to jest opis pierwszego orlika',
        linkHandle:"https://lublin.eu/sport/orliki/boiska-orlik-w-lublinie/orlik-lublin-ul-wajdeloty-1,8880,w.html",
    },
    {
        id: '2',
        title: 'drugi orlik',
        address: 'Aleje Racławickie 7',
        image:{test1: "test1", test2:"test2"},
        description: 'to jest opis drugiego orlika',
        linkHandle:'https://lublin.eu/sport/orliki/boiska-orlik-w-lublinie/orlik-lublin-aleje-raclawickie-7,8886,w.html',
    },
];


const DUMMY2 = [
    {
        orlik_id:'0',
        adress: 'ul. Rycerska 9',
        school: 'Szkoła Podstawowa nr 42',
            contact: {
              number: '815360110',
              email: 'poczta@sp42.lublin.eu'
            },
            terms: {
        en:'IT IS STRICTLY PROHIBITED: \n 1) To use football shoes with metal studs   \n 2. Using bikes, skateboards and other similar vehicles on the pitch. \n 3. Destroying the pitch \n 4. Climbing onto the fence \n 5. Eating an smoking \n 6. Disturbing ongoing matches \n 7. Using vulgar language \n 8. Entrance after dark for minors under 15 years of age \n 9. Bringing in animals. \n 10. Using the pitch without conscent',
        pl: 'NA TERENIE OBIEKTU OBOWIĄZUJE BEZWZGLĘDNY ZAKAZ: \n 1. Używania butów piłkarskich na wysokich i metalowych korkach \n 2. Wprowadzania i użytkowania sprzętu innego niż zgodnego z przeznaczeniem boisk, np. rower, motorower, deskorolka, rolki itp. \n 3. Niszczenia urządzeń sportowych i płyty boiska, \n 4. Wchodzenia na urządzenia sportowe i ogrodzenie, \n 5. Palenia tytoniu, pożywania alkoholu, żucia gumy, wnoszenia jedzenia, materiałów i przedmiotów niebezpiecznych (butelek, puszek), \n 6. Przeszkadzania w zajęciach lub grze, \n 7. Zakłócania porządku i używania wulgarnych słów, \n 8 Przebywania na terenie osobą poniżej 15 roku życia po zmroku (nie dotyczy zorganizowanych grup sportowych) \n 9. Wprowadzania zwierząt, \n 10. Korzystania z boisk bez zgody instruktora sportu.' 
        }
    },
    {
        orlik_id:'1',
        adress: 'ul. Krasińskiego 7',
        school: 'Szkoła Podstawowa nr 57',
            contact: {
              number: '815250008',
              email: 'poczta@sp57.lublin.eu'
            },
            terms: {
        en:'IT IS STRICTLY PROHIBITED: \n 1) To use football shoes with metal studs   \n 2. Using bikes, skateboards and other similar vehicles on the pitch. \n 3. Destroying the pitch \n 4. Climbing onto the fence \n 5. Eating an smoking \n 6. Disturbing ongoing matches \n 7. Using vulgar language \n 8. Entrance after dark for minors under 15 years of age \n 9. Bringing in animals. \n 10. Using the pitch without conscent',
        pl: 'NA TERENIE OBIEKTU OBOWIĄZUJE BEZWZGLĘDNY ZAKAZ: \n 1. Używania butów piłkarskich na wysokich i metalowych korkach \n 2. Wprowadzania i użytkowania sprzętu innego niż zgodnego z przeznaczeniem boisk, np. rower, motorower, deskorolka, rolki itp. \n 3. Niszczenia urządzeń sportowych i płyty boiska, \n 4. Wchodzenia na urządzenia sportowe i ogrodzenie, \n 5. Palenia tytoniu, pożywania alkoholu, żucia gumy, wnoszenia jedzenia, materiałów i przedmiotów niebezpiecznych (butelek, puszek), \n 6. Przeszkadzania w zajęciach lub grze, \n 7. Zakłócania porządku i używania wulgarnych słów, \n 8 Przebywania na terenie osobą poniżej 15 roku życia po zmroku (nie dotyczy zorganizowanych grup sportowych) \n 9. Wprowadzania zwierząt, \n 10. Korzystania z boisk bez zgody instruktora sportu.' 
        }
    },
    {
        orlik_id:'2',
        adress: 'ul. Wajdeloty 1',
        school: 'Szkoła Podstawowa nr 29',
            contact: {
              number: '815252123',
              email: 'poczta@sp29.lublin.eu'
            },
            terms: {
        en:'IT IS STRICTLY PROHIBITED: \n 1) To use football shoes with metal studs   \n 2. Using bikes, skateboards and other similar vehicles on the pitch. \n 3. Destroying the pitch \n 4. Climbing onto the fence \n 5. Eating an smoking \n 6. Disturbing ongoing matches \n 7. Using vulgar language \n 8. Entrance after dark for minors under 15 years of age \n 9. Bringing in animals. \n 10. Using the pitch without conscent',
        pl: 'NA TERENIE OBIEKTU OBOWIĄZUJE BEZWZGLĘDNY ZAKAZ: \n 1. Używania butów piłkarskich na wysokich i metalowych korkach \n 2. Wprowadzania i użytkowania sprzętu innego niż zgodnego z przeznaczeniem boisk, np. rower, motorower, deskorolka, rolki itp. \n 3. Niszczenia urządzeń sportowych i płyty boiska, \n 4. Wchodzenia na urządzenia sportowe i ogrodzenie, \n 5. Palenia tytoniu, pożywania alkoholu, żucia gumy, wnoszenia jedzenia, materiałów i przedmiotów niebezpiecznych (butelek, puszek), \n 6. Przeszkadzania w zajęciach lub grze, \n 7. Zakłócania porządku i używania wulgarnych słów, \n 8 Przebywania na terenie osobą poniżej 15 roku życia po zmroku (nie dotyczy zorganizowanych grup sportowych) \n 9. Wprowadzania zwierząt, \n 10. Korzystania z boisk bez zgody instruktora sportu.' 
        }
    },
    {
        orlik_id:'3',
        adress: 'Aleje Racławickie 7',
        school: 'Zespół Szkół Chemicznych',
            contact: {
              number: '814421920',
              email: 'poczta@zschips.lublin.eu'
            },
            terms: {
        en:'IT IS STRICTLY PROHIBITED: \n 1) To use football shoes with metal studs   \n 2. Using bikes, skateboards and other similar vehicles on the pitch. \n 3. Destroying the pitch \n 4. Climbing onto the fence \n 5. Eating an smoking \n 6. Disturbing ongoing matches \n 7. Using vulgar language \n 8. Entrance after dark for minors under 15 years of age \n 9. Bringing in animals. \n 10. Using the pitch without conscent',
        pl: 'NA TERENIE OBIEKTU OBOWIĄZUJE BEZWZGLĘDNY ZAKAZ: \n 1. Używania butów piłkarskich na wysokich i metalowych korkach \n 2. Wprowadzania i użytkowania sprzętu innego niż zgodnego z przeznaczeniem boisk, np. rower, motorower, deskorolka, rolki itp. \n 3. Niszczenia urządzeń sportowych i płyty boiska, \n 4. Wchodzenia na urządzenia sportowe i ogrodzenie, \n 5. Palenia tytoniu, pożywania alkoholu, żucia gumy, wnoszenia jedzenia, materiałów i przedmiotów niebezpiecznych (butelek, puszek), \n 6. Przeszkadzania w zajęciach lub grze, \n 7. Zakłócania porządku i używania wulgarnych słów, \n 8 Przebywania na terenie osobą poniżej 15 roku życia po zmroku (nie dotyczy zorganizowanych grup sportowych) \n 9. Wprowadzania zwierząt, \n 10. Korzystania z boisk bez zgody instruktora sportu.' 
        }
    },
    {
        orlik_id:'4',
        adress: 'ul. Czwartaków 11',
        school: 'Szkoła Podstawowa nr 6',
            contact: {
              number: '667160887',
              email: 'sp6@sp6.lublin.eu'
            },
            terms: {
        en:'IT IS STRICTLY PROHIBITED: \n 1) To use football shoes with metal studs   \n 2. Using bikes, skateboards and other similar vehicles on the pitch. \n 3. Destroying the pitch \n 4. Climbing onto the fence \n 5. Eating an smoking \n 6. Disturbing ongoing matches \n 7. Using vulgar language \n 8. Entrance after dark for minors under 15 years of age \n 9. Bringing in animals. \n 10. Using the pitch without conscent',
        pl: 'NA TERENIE OBIEKTU OBOWIĄZUJE BEZWZGLĘDNY ZAKAZ: \n 1. Używania butów piłkarskich na wysokich i metalowych korkach \n 2. Wprowadzania i użytkowania sprzętu innego niż zgodnego z przeznaczeniem boisk, np. rower, motorower, deskorolka, rolki itp. \n 3. Niszczenia urządzeń sportowych i płyty boiska, \n 4. Wchodzenia na urządzenia sportowe i ogrodzenie, \n 5. Palenia tytoniu, pożywania alkoholu, żucia gumy, wnoszenia jedzenia, materiałów i przedmiotów niebezpiecznych (butelek, puszek), \n 6. Przeszkadzania w zajęciach lub grze, \n 7. Zakłócania porządku i używania wulgarnych słów, \n 8 Przebywania na terenie osobą poniżej 15 roku życia po zmroku (nie dotyczy zorganizowanych grup sportowych) \n 9. Wprowadzania zwierząt, \n 10. Korzystania z boisk bez zgody instruktora sportu.' 
        }
    },
    {
        orlik_id:'5',
        adress: 'ul. Radzyńska 5',
        school: 'Zespół Szkół Ogólnokształcących nr 1 ',
            contact: {
              number: '817413703',
              email: 'poczta@zso1.lublin.eu'
            },
            terms: {
        en:'IT IS STRICTLY PROHIBITED: \n 1) To use football shoes with metal studs   \n 2. Using bikes, skateboards and other similar vehicles on the pitch. \n 3. Destroying the pitch \n 4. Climbing onto the fence \n 5. Eating an smoking \n 6. Disturbing ongoing matches \n 7. Using vulgar language \n 8. Entrance after dark for minors under 15 years of age \n 9. Bringing in animals. \n 10. Using the pitch without conscent',
        pl: 'NA TERENIE OBIEKTU OBOWIĄZUJE BEZWZGLĘDNY ZAKAZ: \n 1. Używania butów piłkarskich na wysokich i metalowych korkach \n 2. Wprowadzania i użytkowania sprzętu innego niż zgodnego z przeznaczeniem boisk, np. rower, motorower, deskorolka, rolki itp. \n 3. Niszczenia urządzeń sportowych i płyty boiska, \n 4. Wchodzenia na urządzenia sportowe i ogrodzenie, \n 5. Palenia tytoniu, pożywania alkoholu, żucia gumy, wnoszenia jedzenia, materiałów i przedmiotów niebezpiecznych (butelek, puszek), \n 6. Przeszkadzania w zajęciach lub grze, \n 7. Zakłócania porządku i używania wulgarnych słów, \n 8 Przebywania na terenie osobą poniżej 15 roku życia po zmroku (nie dotyczy zorganizowanych grup sportowych) \n 9. Wprowadzania zwierząt, \n 10. Korzystania z boisk bez zgody instruktora sportu.' 
        }
    },
    {
        orlik_id:'6',
        adress: 'ul. Tumidajskiego 6A',
        school: 'Zespół Szkół Ogólnokształcących nr 4',
            contact: {
              number: '817476016',
              email: 'zso4@zso4.lublin.eu'
            },
            terms: {
        en:'IT IS STRICTLY PROHIBITED: \n 1) To use football shoes with metal studs   \n 2. Using bikes, skateboards and other similar vehicles on the pitch. \n 3. Destroying the pitch \n 4. Climbing onto the fence \n 5. Eating an smoking \n 6. Disturbing ongoing matches \n 7. Using vulgar language \n 8. Entrance after dark for minors under 15 years of age \n 9. Bringing in animals. \n 10. Using the pitch without conscent',
        pl: 'NA TERENIE OBIEKTU OBOWIĄZUJE BEZWZGLĘDNY ZAKAZ: \n 1. Używania butów piłkarskich na wysokich i metalowych korkach \n 2. Wprowadzania i użytkowania sprzętu innego niż zgodnego z przeznaczeniem boisk, np. rower, motorower, deskorolka, rolki itp. \n 3. Niszczenia urządzeń sportowych i płyty boiska, \n 4. Wchodzenia na urządzenia sportowe i ogrodzenie, \n 5. Palenia tytoniu, pożywania alkoholu, żucia gumy, wnoszenia jedzenia, materiałów i przedmiotów niebezpiecznych (butelek, puszek), \n 6. Przeszkadzania w zajęciach lub grze, \n 7. Zakłócania porządku i używania wulgarnych słów, \n 8 Przebywania na terenie osobą poniżej 15 roku życia po zmroku (nie dotyczy zorganizowanych grup sportowych) \n 9. Wprowadzania zwierząt, \n 10. Korzystania z boisk bez zgody instruktora sportu.' 
        }
    },
    {
        orlik_id:'7',
        adress: 'ul. Śliwińskiego 5',
        school: 'Szkoła Podstawowa nr 43',
            contact: {
              number: '817411305',
              email: 'poczta@sp43.lublin.eu'
            },
            terms: {
        en:'IT IS STRICTLY PROHIBITED: \n 1) To use football shoes with metal studs   \n 2. Using bikes, skateboards and other similar vehicles on the pitch. \n 3. Destroying the pitch \n 4. Climbing onto the fence \n 5. Eating an smoking \n 6. Disturbing ongoing matches \n 7. Using vulgar language \n 8. Entrance after dark for minors under 15 years of age \n 9. Bringing in animals. \n 10. Using the pitch without conscent',
        pl: 'NA TERENIE OBIEKTU OBOWIĄZUJE BEZWZGLĘDNY ZAKAZ: \n 1. Używania butów piłkarskich na wysokich i metalowych korkach \n 2. Wprowadzania i użytkowania sprzętu innego niż zgodnego z przeznaczeniem boisk, np. rower, motorower, deskorolka, rolki itp. \n 3. Niszczenia urządzeń sportowych i płyty boiska, \n 4. Wchodzenia na urządzenia sportowe i ogrodzenie, \n 5. Palenia tytoniu, pożywania alkoholu, żucia gumy, wnoszenia jedzenia, materiałów i przedmiotów niebezpiecznych (butelek, puszek), \n 6. Przeszkadzania w zajęciach lub grze, \n 7. Zakłócania porządku i używania wulgarnych słów, \n 8 Przebywania na terenie osobą poniżej 15 roku życia po zmroku (nie dotyczy zorganizowanych grup sportowych) \n 9. Wprowadzania zwierząt, \n 10. Korzystania z boisk bez zgody instruktora sportu.' 
        }
    },
    {
        orlik_id:'8',
        adress: 'ul. Lwowska 11',
        school: 'Zespół Szkół Odzieżowo - Włókienniczych',
            contact: {
              number: '815324116',
              email: 'poczta@zsow.lublin.eu'
            },
            terms: {
        en:'IT IS STRICTLY PROHIBITED: \n 1) To use football shoes with metal studs   \n 2. Using bikes, skateboards and other similar vehicles on the pitch. \n 3. Destroying the pitch \n 4. Climbing onto the fence \n 5. Eating an smoking \n 6. Disturbing ongoing matches \n 7. Using vulgar language \n 8. Entrance after dark for minors under 15 years of age \n 9. Bringing in animals. \n 10. Using the pitch without conscent',
        pl: 'NA TERENIE OBIEKTU OBOWIĄZUJE BEZWZGLĘDNY ZAKAZ: \n 1. Używania butów piłkarskich na wysokich i metalowych korkach \n 2. Wprowadzania i użytkowania sprzętu innego niż zgodnego z przeznaczeniem boisk, np. rower, motorower, deskorolka, rolki itp. \n 3. Niszczenia urządzeń sportowych i płyty boiska, \n 4. Wchodzenia na urządzenia sportowe i ogrodzenie, \n 5. Palenia tytoniu, pożywania alkoholu, żucia gumy, wnoszenia jedzenia, materiałów i przedmiotów niebezpiecznych (butelek, puszek), \n 6. Przeszkadzania w zajęciach lub grze, \n 7. Zakłócania porządku i używania wulgarnych słów, \n 8 Przebywania na terenie osobą poniżej 15 roku życia po zmroku (nie dotyczy zorganizowanych grup sportowych) \n 9. Wprowadzania zwierząt, \n 10. Korzystania z boisk bez zgody instruktora sportu.' 
        }
    },
    {
        orlik_id:'9',
        adress: 'ul. Pogodna 19',
        school: 'Szkoła Podstawowa nr 33',
            contact: {
              number: '814420282',
              email: 'poczta@sp33.lublin.eu'
            },
            terms: {
        en:'IT IS STRICTLY PROHIBITED: \n 1) To use football shoes with metal studs   \n 2. Using bikes, skateboards and other similar vehicles on the pitch. \n 3. Destroying the pitch \n 4. Climbing onto the fence \n 5. Eating an smoking \n 6. Disturbing ongoing matches \n 7. Using vulgar language \n 8. Entrance after dark for minors under 15 years of age \n 9. Bringing in animals. \n 10. Using the pitch without conscent',
        pl: 'NA TERENIE OBIEKTU OBOWIĄZUJE BEZWZGLĘDNY ZAKAZ: \n 1. Używania butów piłkarskich na wysokich i metalowych korkach \n 2. Wprowadzania i użytkowania sprzętu innego niż zgodnego z przeznaczeniem boisk, np. rower, motorower, deskorolka, rolki itp. \n 3. Niszczenia urządzeń sportowych i płyty boiska, \n 4. Wchodzenia na urządzenia sportowe i ogrodzenie, \n 5. Palenia tytoniu, pożywania alkoholu, żucia gumy, wnoszenia jedzenia, materiałów i przedmiotów niebezpiecznych (butelek, puszek), \n 6. Przeszkadzania w zajęciach lub grze, \n 7. Zakłócania porządku i używania wulgarnych słów, \n 8 Przebywania na terenie osobą poniżej 15 roku życia po zmroku (nie dotyczy zorganizowanych grup sportowych) \n 9. Wprowadzania zwierząt, \n 10. Korzystania z boisk bez zgody instruktora sportu.' 
        }
    },
    {
        orlik_id:'10',
        adress: 'ul. Róży Wiatrów 9',
        school: 'Szkoła Podstawowa nr 40',
            contact: {
              number: '817442808',
              email: 'poczta@sp40.lublin.eu '
            },
            terms: {
        en:'IT IS STRICTLY PROHIBITED: \n 1) To use football shoes with metal studs   \n 2. Using bikes, skateboards and other similar vehicles on the pitch. \n 3. Destroying the pitch \n 4. Climbing onto the fence \n 5. Eating an smoking \n 6. Disturbing ongoing matches \n 7. Using vulgar language \n 8. Entrance after dark for minors under 15 years of age \n 9. Bringing in animals. \n 10. Using the pitch without conscent',
        pl: 'NA TERENIE OBIEKTU OBOWIĄZUJE BEZWZGLĘDNY ZAKAZ: \n 1. Używania butów piłkarskich na wysokich i metalowych korkach \n 2. Wprowadzania i użytkowania sprzętu innego niż zgodnego z przeznaczeniem boisk, np. rower, motorower, deskorolka, rolki itp. \n 3. Niszczenia urządzeń sportowych i płyty boiska, \n 4. Wchodzenia na urządzenia sportowe i ogrodzenie, \n 5. Palenia tytoniu, pożywania alkoholu, żucia gumy, wnoszenia jedzenia, materiałów i przedmiotów niebezpiecznych (butelek, puszek), \n 6. Przeszkadzania w zajęciach lub grze, \n 7. Zakłócania porządku i używania wulgarnych słów, \n 8 Przebywania na terenie osobą poniżej 15 roku życia po zmroku (nie dotyczy zorganizowanych grup sportowych) \n 9. Wprowadzania zwierząt, \n 10. Korzystania z boisk bez zgody instruktora sportu.' 
        }
    },
    {
        orlik_id:'11',
        adress: 'ul. Kunickiego 116',
        school: 'Szkoła Podstawowa nr 1',
            contact: {
              number: '817440607',
              email: 'poczta@sp1.lublin.eu'
            },
            terms: {
        en:'IT IS STRICTLY PROHIBITED: \n 1) To use football shoes with metal studs   \n 2. Using bikes, skateboards and other similar vehicles on the pitch. \n 3. Destroying the pitch \n 4. Climbing onto the fence \n 5. Eating an smoking \n 6. Disturbing ongoing matches \n 7. Using vulgar language \n 8. Entrance after dark for minors under 15 years of age \n 9. Bringing in animals. \n 10. Using the pitch without conscent',
        pl: 'NA TERENIE OBIEKTU OBOWIĄZUJE BEZWZGLĘDNY ZAKAZ: \n 1. Używania butów piłkarskich na wysokich i metalowych korkach \n 2. Wprowadzania i użytkowania sprzętu innego niż zgodnego z przeznaczeniem boisk, np. rower, motorower, deskorolka, rolki itp. \n 3. Niszczenia urządzeń sportowych i płyty boiska, \n 4. Wchodzenia na urządzenia sportowe i ogrodzenie, \n 5. Palenia tytoniu, pożywania alkoholu, żucia gumy, wnoszenia jedzenia, materiałów i przedmiotów niebezpiecznych (butelek, puszek), \n 6. Przeszkadzania w zajęciach lub grze, \n 7. Zakłócania porządku i używania wulgarnych słów, \n 8 Przebywania na terenie osobą poniżej 15 roku życia po zmroku (nie dotyczy zorganizowanych grup sportowych) \n 9. Wprowadzania zwierząt, \n 10. Korzystania z boisk bez zgody instruktora sportu.' 
        }
    },
    {
        orlik_id:'12',
        adress: 'ul. Jagiełły 11',
        school: 'Szkoła Podstawowa nr 42',
            contact: {
              number: '817468177',
              email: 'poczta@sp52.lublin.eu'
            },
            terms: {
        en:'IT IS STRICTLY PROHIBITED: \n 1) To use football shoes with metal studs   \n 2. Using bikes, skateboards and other similar vehicles on the pitch. \n 3. Destroying the pitch \n 4. Climbing onto the fence \n 5. Eating an smoking \n 6. Disturbing ongoing matches \n 7. Using vulgar language \n 8. Entrance after dark for minors under 15 years of age \n 9. Bringing in animals. \n 10. Using the pitch without conscent',
        pl: 'NA TERENIE OBIEKTU OBOWIĄZUJE BEZWZGLĘDNY ZAKAZ: \n 1. Używania butów piłkarskich na wysokich i metalowych korkach \n 2. Wprowadzania i użytkowania sprzętu innego niż zgodnego z przeznaczeniem boisk, np. rower, motorower, deskorolka, rolki itp. \n 3. Niszczenia urządzeń sportowych i płyty boiska, \n 4. Wchodzenia na urządzenia sportowe i ogrodzenie, \n 5. Palenia tytoniu, pożywania alkoholu, żucia gumy, wnoszenia jedzenia, materiałów i przedmiotów niebezpiecznych (butelek, puszek), \n 6. Przeszkadzania w zajęciach lub grze, \n 7. Zakłócania porządku i używania wulgarnych słów, \n 8 Przebywania na terenie osobą poniżej 15 roku życia po zmroku (nie dotyczy zorganizowanych grup sportowych) \n 9. Wprowadzania zwierząt, \n 10. Korzystania z boisk bez zgody instruktora sportu.' 
        }
    },

];

function Orliki(){

    Axios.defaults.withCredentials = true;

    const [dane, setDane] = useState([]);
    

    useEffect(() => {
        const getDane = () => {

            Axios.get("http://localhost:3001/orliki").then((response) => {
            console.log(response.data);
            setDane(response.data);
        });
    
        }
        getDane();
      }, []);

      


console.log(dane);

return(
<div className="list-group"> 
            <h1 className="text-center">Lista orlików</h1> 
            
          <OrlikiItemList orliki={dane}/>
        </div>
        );
}

export default Orliki;