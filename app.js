const PDFDocument = require("pdfkit");
const fs = require("fs");

let certificate_data = {
  updated_at: "2022-11-23T00:10:33.000-03:00",
  created_at: "2022-11-23T00:10:33.000-03:00",
  categoria: "micro",
  cuit: "23233265519",
  desde: "2022-11-24T00:10:04.000-03:00",
  estado: "noInformadoGDE",
  fechaInformado: "2022-11-23T00:10:04.000-03:00",
  fecha_emision: "2022-11-23T00:10:33.000-03:00",
  hasta: "2023-04-30T20:59:59.000-03:00",
  nro_registro: 6065808,
  razonSocial: "DIEGUITIN",
  sector: "Agropecuario",
  tipo: "inscripcion",
  transaccion: 991404491,
  vigenciaMeses: 5,
};

const pdf = new PDFDocument();

pdf.pipe(fs.createWriteStream("output.pdf"));

pdf.image("images/certificate_header.jpeg", 45, 30, { width: 520 });

pdf.moveDown(4);

pdf.text(
  `CERTIFICADO DE ACREDITACIÓN DE LA CONDICIÓN DE MICRO, PEQUEÑA O MEDIANA EMPRESA.`,
  127,
  125,
  {
    align: "center",
    width: 350,
  }
);

// Define the rectangle dimensions and position
const x = 122;
const y = 200;
const width = 360;
const height = 310;

// Draw the rectangle
pdf.rect(x, y, width, height).stroke("#eeeff0");

const sideDistance = 17;
const heightDistance = 35;

for (let i = 1; i < 7; i++) {
  pdf
    .moveTo(x + sideDistance, y + heightDistance * i)
    .lineTo(x + width - sideDistance, y + heightDistance * i)
    .stroke("#363636");
}

pdf.rect(x + sideDistance, y, width - sideDistance, 50).fill("#eeeff0");

pdf.rect(x, 200, 200, 50).fill("#eeeff0");

//alto

pdf.end();
