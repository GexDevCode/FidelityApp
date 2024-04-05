export function formatInteger(n : number) {
    let format = ""
    let newN: any = n;

    let first3number = ""
    const suffix = String(n).length < 7 ? 3 : 6; 
    if(String(n).length > suffix) {
        for (let i = 0; i < (String(n).length - suffix); i++) {
            if(i < 3) {
                first3number += String(n)[i];
            }
        }
    }


    if(n > 999 && n <= 999999){ newN = first3number; format = "K"; }
    if(n > 999999) { newN = first3number; format = "M"; }
    return newN + format;
}