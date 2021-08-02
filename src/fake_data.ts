import country_info from './country_code.json';
import faker from 'faker';
import crypto from 'crypto';
import dayjs from 'dayjs';

type Country = { code: string, name: string }

const cc: Country[] = country_info;

// const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;
// const ccArr = getKeys(cc);
// const ccArr = Object.keys(cc) as Array<keyof typeof cc>;
const ccLen = cc.length;
function randomCountryCode(): Country {
    return cc[Math.floor(Math.random() * (ccLen - 1))];
}

// function* setRow() {
//     let i = 1;
//     yield i++;
// }
function setRow(): Function {
    let i = 1;
    return function (): number {
        return i++;
    }
}

function setPlaceId(countryName: string): string {
    const secretKey = 'sadff23324dfsd#$%#$@'
    return crypto.createHmac('sha256', secretKey).digest('hex');
}

function setDate(): string {
    return dayjs(faker.date.between('2021-01-01', '2021-05-20')).format('YYYY-MM-DD');
}

interface Result {
    row: number;
    country_region_code: string;
    country_region: string;
    region: null;
    placeId: string;
    date: string;
    symptom_abdominal_obesityi: number;
}

function makeData(size: number): Result[] {
    // const generateRow = setRow();
    // let row = generateRow.next().value;
    let generateRow = setRow();

    let result: Result[] = [];
    for(let i = 0; i < size; i += 1) {
        const { code: country_region_code, name: country_region } = randomCountryCode();
        result.push({
            row: generateRow(),
            country_region_code,
            country_region,
            region: null,
            placeId: setPlaceId(country_region_code),
            date: setDate(),
            symptom_abdominal_obesityi: faker.datatype.number({ min: 0, max: 10, precision: 0.01 }),
        });
    }
    return result;
}

export default makeData;
