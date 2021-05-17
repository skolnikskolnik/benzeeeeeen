const getKaFromPka = pKa => {
 let valKa = Math.pow(10, (-1 * pKa));
 valKa = valKa.toFixed(15);

 return valKa;
}

export default getKaFromPka;