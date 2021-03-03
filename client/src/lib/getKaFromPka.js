const getKaFromPka = pKa => {
 let valKa = Math.pow(10, (-1 * pKa));
 valKa = valKa.toFixed(10);

 return valKa;
}

export default getKaFromPka;