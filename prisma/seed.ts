import prisma from "@/lib/db";
import { PrismaClient } from "../app/generated/prisma/client";

async function main() {
  console.log("Start seeding ...");

  // 1. Categories (from image 1 & 4)
  const categoriesData = [
    { name: "Wires & Cables", id: "cat_wires_cables" },
    { name: "Switches", id: "cat_switches" },
    { name: "Switch Gear & Contactors", id: "cat_switch_gear" },
    { name: "Lugs & Glands", id: "cat_lugs_glands" },
    { name: "Conduits", id: "cat_conduits" },
    { name: "Termination & Joining Kits", id: "cat_termination" },
    { name: "Cable Ties", id: "cat_cable_ties" },
    { name: "LED Lights", id: "cat_led_lights" },
    { name: "Panel Accessories", id: "cat_panel_accessories" },
    { name: "Other Accessories", id: "cat_other_accessories" },
  ];

  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: {},
      create: {
        id: cat.id,
        name: cat.name,
      },
    });
  }
  console.log("Categories seeded.");

  // 2. Brands (from image 4)
  // Mapping brands to categories broadly based on image context
  const brandsData = [
    // Wires & Cables
    { name: "Polycab", id: "brand_polycab", categories: ["cat_wires_cables"] },
    { name: "KEI", id: "brand_kei", categories: ["cat_wires_cables"] },
    { name: "Finolex", id: "brand_finolex", categories: ["cat_wires_cables"] },
    {
      name: "Orbit",
      id: "brand_orbit",
      categories: ["cat_wires_cables", "cat_conduits"],
    },

    // Switches
    {
      name: "Anchor by Panasonic",
      id: "brand_anchor",
      categories: ["cat_switches"],
    },
    {
      name: "Legrand",
      id: "brand_legrand",
      categories: ["cat_switches", "cat_switch_gear"],
    },
    { name: "MK", id: "brand_mk", categories: ["cat_switches"] },
    { name: "Goldmedal", id: "brand_goldmedal", categories: ["cat_switches"] },

    // Switch Gear
    {
      name: "Schneider Electric",
      id: "brand_schneider",
      categories: ["cat_switch_gear"],
    },
    { name: "Siemens", id: "brand_siemens", categories: ["cat_switch_gear"] },
    { name: "L&T", id: "brand_lt", categories: ["cat_switch_gear"] }, // Logo looks like L&T
    { name: "ABB", id: "brand_abb", categories: ["cat_switch_gear"] },
    { name: "Flu-Con", id: "brand_flucon", categories: ["cat_cable_ties"] },

    // Lugs & Glands
    { name: "Comet", id: "brand_comet", categories: ["cat_lugs_glands"] },
    { name: "Dowells", id: "brand_dowells", categories: ["cat_lugs_glands"] },
    { name: "Hex", id: "brand_hex", categories: ["cat_lugs_glands"] },
    { name: "HMI", id: "brand_hmi", categories: ["cat_lugs_glands"] },

    // Conduits
    { name: "Sudhakar", id: "brand_sudhakar", categories: ["cat_conduits"] },
    { name: "VIP", id: "brand_vip", categories: ["cat_conduits"] },
    { name: "Precision", id: "brand_precision", categories: ["cat_conduits"] },
    { name: "Champion", id: "brand_champion", categories: ["cat_conduits"] },

    // Termination
    { name: "Raychem", id: "brand_raychem", categories: ["cat_termination"] },
    { name: "3M", id: "brand_3m", categories: ["cat_termination"] },
    { name: "Densons", id: "brand_densons", categories: ["cat_termination"] },

    // Cable Ties
    { name: "KSS", id: "brand_kss", categories: ["cat_cable_ties"] },
    { name: "Tycab", id: "brand_tycab", categories: ["cat_cable_ties"] },
    { name: "Surelock", id: "brand_surelock", categories: ["cat_cable_ties"] },

    // LED Lights
    { name: "Philips", id: "brand_philips", categories: ["cat_led_lights"] },
    { name: "Crompton", id: "brand_crompton", categories: ["cat_led_lights"] }, // Assuming G logo might be related or general
    {
      name: "Bajaj Electricals",
      id: "brand_bajaj",
      categories: ["cat_led_lights"],
    },
    { name: "Havells", id: "brand_havells", categories: ["cat_led_lights"] },
    { name: "Osram", id: "brand_osram", categories: ["cat_led_lights"] },

    // Panel Accessories
    {
      name: "Elemex",
      id: "brand_elemex",
      categories: ["cat_panel_accessories"],
    },
    {
      name: "Connectwell",
      id: "brand_connectwell",
      categories: ["cat_panel_accessories"],
    },
    {
      name: "Rexnord",
      id: "brand_rexnord",
      categories: ["cat_panel_accessories"],
    },
    { name: "Nadi", id: "brand_nadi", categories: ["cat_panel_accessories"] },
    {
      name: "Shavison",
      id: "brand_shavison",
      categories: ["cat_panel_accessories"],
    },
    { name: "Omron", id: "brand_omron", categories: ["cat_panel_accessories"] },
  ];

  for (const brand of brandsData) {
    await prisma.brand.upsert({
      where: { id: brand.id },
      update: {
        categories: {
          connect: brand.categories.map((c) => ({ id: c })),
        },
      },
      create: {
        id: brand.id,
        name: brand.name,
        categories: {
          connect: brand.categories.map((c) => ({ id: c })),
        },
      },
    });
  }
  console.log("Brands seeded.");

  // 3. Products
  // Creating generic products for each category/brand combo to have data
  for (const brand of brandsData) {
    const brandCategoryIds = brand.categories;
    for (const catId of brandCategoryIds) {
      const productId = `prod_${brand.id}_${catId}_001`;
      await prisma.product.upsert({
        where: { id: productId },
        update: {},
        create: {
          id: productId,
          name: `${brand.name} ${catId
            .replace("cat_", "")
            .replace("_", " ")} Product`,
          description: `High quality ${catId
            .replace("cat_", "")
            .replace("_", " ")} from ${brand.name}.`,
          brandId: brand.id,
          categoryId: catId,
          status: "PUBLISHED",
          price: 100 + Math.floor(Math.random() * 1000), // Random price
        },
      });
    }
  }
  console.log("Products seeded.");

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
