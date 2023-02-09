//uitls or utiltiy functions file contains those functions which you can re-use anythime in your application

import FileSaver from 'file-saver';

import {surpriseMePrompts} from "../constants/index"

export function getRandomPrompt(prompt){ //this is the last prompt , we have passed this to make sure that the new prompt does not again come out same as the previous one 
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length); //will give an integer from 0 to 49, as we have 50 strings in the surprise Me prompt array of strings 
    const randomPrompt = surpriseMePrompts[randomIndex]; 

    //check
    if(randomPrompt === prompt){
        return getRandomPrompt(prompt);
    }

    return randomPrompt;
}

//this is the way to use the FileSaver library
export async function downloadImage(_id , photo){
    FileSaver.saveAs(photo , `download-${_id}.jpg`);
}