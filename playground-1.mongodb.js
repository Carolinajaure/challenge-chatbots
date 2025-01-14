

use('mongodbVSCodePlaygroundDB');// seleccion de la base de datos a utilizar


const collections = db.getCollectionNames();


if (collections.includes('Entradas')) {
    db.Entradas.deleteMany({});
    db.Entradas.insertMany([
        { nombre: 'Niguiri de Salmón ( 5 unidades )',descripcion: 'Finas láminas de salmón sobre arroz sazonado.', precio: 9000 },
        { nombre: 'Nigiri de Anguila (5 unidades)',descripcion:'Anguila asada con salsa kabayaki sobre arroz sazonado.', precio: 9500 },
        { nombre: 'Langostinos empanados rellenos de queso ( 4 unidades )', descripcion:'', precio: 9000 }
    ]);
    console.log('Documents inserted into Entradas.');
    const entradas = db.Entradas.find().toArray();
    console.log('Entradas:', entradas);
} else {
    console.log('Collection Entradas already exists.');
}

if (!collections.includes('Gohan')) {
    db.createCollection('Gohan');
    db.Gohan.insertMany([
        { nombre: 'Gohan de Salmón', descripcion: 'Base de arroz gohan, salmón rosado, langostinos crispy, kanikama, palta y quesocrema. Topping de sésamo mixto y cebolla de verdeo.', precio: 15000 },
        { nombre: 'Kentucky', descripcion: 'Base de arroz gohan, pollo crispy, palta, queso crema, chauchas, garbanzos fritos y sésamo negro.', precio: 13000 },
        { nombre: 'Tacna', descripcion: 'Base de arroz gohan, salmón rosado, langostinos crispy, palta y queso citrus. Topping mix de quinoa frita y maíz cancha, con salsa de ají amarillo.', precio: 15500 }
    ]);
    console.log('Documents inserted into Gohan.');
    const gohan = db.Gohan.find().toArray();
    console.log('Gohan:', gohan);
} else {
    console.log('Collection Gohan already exists.');
}

if (!collections.includes('Rolls')) {
    db.createCollection('Rolls')
    db.Rolls.insertMany([
        { nombre: 'Tiger Roll', descripcion: 'Camarón tempura, aguacate y pepino, cubierto con láminas de salmón y salsa de mango.', precio: 1500 },
        { nombre: 'Philadelphia Roll', descripcion: 'Salmón, queso crema y aguacate, envuelto en arroz y alga nori.', precio: 1200 },
        { nombre: 'Crispy Roll', descripcion: 'Cangrejo, queso crema y aguacate, empanizado y frito, servido con salsa picante.', precio: 1300 },
        { nombre: 'Ebi Tempura Roll', descripcion: 'Camarón tempura, aguacate y pepino, envuelto en arroz y alga nori, coronado con salsa de anguila.', precio: 1450 },
        { nombre: 'Spider Roll', descripcion: 'Cangrejo de caparazón blando, lechuga, pepino y aguacate, con un toque de salsa ponzu.', precio: 1600 },
        { nombre: 'Lava Roll', descripcion: 'Roll relleno de camarón tempura y queso crema, cubierto con una mezcla de cangrejo picante y mayonesa al horno.', precio: 1550 },
        { nombre: 'Tuna Lover Roll', descripcion: 'Atún fresco, pepino y cebolla verde, cubierto con más atún y un toque de salsa ponzu.', precio: 1600 },
        { nombre: 'Samurai Roll', descripcion: 'Salmón, cangrejo y espárragos, cubierto con aguacate, tobiko (huevas de pez) y salsa spicy mayo.', precio: 1700 },
        { nombre: 'Golden Roll', descripcion: 'Roll relleno de cangrejo y queso crema, cubierto con salmón flameado y salsa teriyaki.', precio: 1650 },
        { nombre: 'Vegetarian Roll', descripcion: 'Aguacate, pepino, zanahoria, espárragos y tofu, envuelto en arroz y alga nori.', precio: 900 },
        { nombre: 'Fusion Roll', descripcion: 'Pulpo, cangrejo y aguacate, cubierto con atún y mango, servido con salsa de yuzu.', precio: 1700 },
        { nombre: 'Black Dragon Roll', descripcion: 'Camarón tempura y queso crema, cubierto con anguila y salsa kabayaki.', precio: 1600 },
        { nombre: 'Tempura Veggie Roll', descripcion: 'Vegetales tempura (calabaza, zanahoria y espárragos), enrollados en arroz y alga nori, servidos con salsa de soja.', precio: 1200 }
    ]);
    console.log('Documents inserted into Rolls.');
    const rolls = db.Rolls.find().toArray();
    console.log('Rolls:', rolls);
} else {
    console.log('Collection Rolls already exists.');
}

if (!collections.includes('Combos')) {
    db.createCollection('Combos');
    db.Combos.insertMany([
        { nombre: 'Combo Básico (12 piezas)', descripcion: 'Ideal para una persona.\n\n6 piezas de California Roll\n6 piezas de Philadelphia Roll', precio: 12000 },
        { nombre: 'Combo Clásico (18 piezas)', descripcion: 'Perfecto para dos personas.\n\n6 piezas de California Roll\n6 piezas de Spicy Tuna Roll\n6 piezas de Salmon Avocado Roll', precio: 16000 },
        { nombre: 'Combo Vegetariano (16 piezas)', descripcion: 'Delicioso y libre de proteína animal.\n\n8 piezas de Vegetarian Roll\n8 piezas de Tempura Veggie Roll', precio: 14000 },
        { nombre: 'Combo Deluxe (24 piezas)', descripcion: 'Para quienes buscan variedad y sabor.\n\n8 piezas de Tiger Roll\n8 piezas de Dragon Roll\n8 piezas de Rainbow Roll', precio: 25000 },
        { nombre: 'Combo Familiar (40 piezas)', descripcion: 'Ideal para grupos grandes o celebraciones.\n\n8 piezas de California Roll\n8 piezas de Philadelphia Roll\n8 piezas de Ebi Tempura Roll\n8 piezas de Spider Roll\n8 piezas de Crispy Roll', precio: 45000 },
        { nombre: 'Combo Especial del Chef (32 piezas)', descripcion: 'Un mix creativo y único recomendado por el chef.\n\n8 piezas de Lava Roll\n8 piezas de Samurai Roll\n8 piezas de Fusion Roll\n8 piezas de Golden Roll', precio: 35000 }
    ]);
    console.log('Documents inserted into Combos.');
    const combos = db.Combos.find().toArray();
    console.log('Combos:', combos);
} else {
    console.log('Collection Combos already exists.');
}

const updatedCollections = db.getCollectionNames();
console.log('Collections:', updatedCollections);