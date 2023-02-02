const pdfkit = require("pdfkit");
const fs = require("fs");

let certificateData = {
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

const fields = [
  "Número de Registro",
  "CUIT",
  "Razón Social",
  "Categoría",
  "Sector",
  "Fecha de Emisión",
];

const pdf = new pdfkit();

pdf.pipe(fs.createWriteStream("certificate.pdf"));

//header
pdf.image("images/certificate_header.jpeg", 45, 30, { width: 520 });

pdf.moveDown(4);

//subtitle
pdf.text(
  `CERTIFICADO DE ACREDITACIÓN DE LA CONDICIÓN DE MICRO, PEQUEÑA O MEDIANA EMPRESA.`,
  127,
  125,
  {
    align: "center",
    width: 350,
  }
);

//table
const x = 122;
const y = 200;
const width = 360;
const height = 310;

pdf.rect(x, y, width, height).stroke("#eeeff0");

//table lines
const sideDistance = 17;
const heightDistance = 35;

for (let i = 1; i <= fields.length; i++) {
  //field
  pdf.fontSize(9).fillColor("#7c7c80");
  pdf.text(fields[i - 1] + ":", x + 25, y - 20 + heightDistance * i);

  //line
  pdf
    .moveTo(x + sideDistance, y + heightDistance * i)
    .lineTo(x + width - sideDistance, y + heightDistance * i)
    .stroke("#363636");
}

//from-since rectangle
pdf.rect(x + sideDistance, 450, 327, 50).fill("#eeeff0");
pdf
  .fontSize(9)
  .fillColor("#7c7c80")
  .text("Desde", x + 100, 470, {
    continued: true,
  })
  .fontSize(10)
  .fillColor("#5b5b5f")
  .text(" xx", {
    continued: true,
  })
  .fontSize(9)
  .fillColor("#7c7c80")
  .text(" - Hasta", x + 100, 470, {
    continued: true,
  })
  .fontSize(10)
  .fillColor("#5b5b5f")
  .text(" xx", {
    continued: true,
  });

pdf.fontSize(10).fillColor("#5b5b5f");
pdf.text(
  `${certificateData.nro_registro}`,
  x + 200,
  y - 20 + heightDistance * 1
);

pdf.fontSize(10).fillColor("#5b5b5f");
pdf.text(`${certificateData.cuit}`, x + 200, y - 20 + heightDistance * 2);

pdf.fontSize(10).fillColor("#5b5b5f");
pdf.text(
  `${certificateData.razonSocial}`,
  x + 200,
  y - 20 + heightDistance * 3
);

pdf.fontSize(10).fillColor("#5b5b5f");
pdf.text(`${certificateData.categoria}`, x + 200, y - 20 + heightDistance * 4);

pdf.fontSize(10).fillColor("#5b5b5f");
pdf.text(`${certificateData.sector}`, x + 200, y - 20 + heightDistance * 5);

pdf.fontSize(10).fillColor("#5b5b5f");
pdf.text(
  `${certificateData.fecha_emision}`,
  x + 200,
  y - 20 + heightDistance * 6
);

//footer
pdf.image("images/certificate_footer.jpeg", 45, 700, { width: 520 });

pdf.end();
