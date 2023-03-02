import {states} from '../data/state-districts';

export const getAllStates =() =>{
   return states.map(i => ({
        label : i.state,
        id: i.state
    }));
};

export const getDistricts = (state : string) =>{
    return states.find(i => i.state === state)?.districts.map(i => ({
        label : i,
        id: i
    }));

}