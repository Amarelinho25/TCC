import { readFileSync } from "node:fs";

for (const n of [3, 4, 5, 6, 7, 8, 9]) {
  try {
    // 1. Primeiro lemos o arquivo e criamos `stands` e `falhas`
    const { stands, falhas } = JSON.parse(
      readFileSync(`scripts/saida/stands-parte-${n}.json`, "utf8")
    );

    // 2. Só depois usamos `stands`
    const semTecnicas = stands.filter((s) => !s.tecnicas || s.tecnicas.length === 0).length;
    const semUsuario = stands.filter((s) => s.usuarios.length === 0).length;
    console.log(
      `Parte ${n}: ${stands.length} stands, ${falhas.length} falhas, ${semTecnicas} sem técnicas, ${semUsuario} sem usuário`
    );

    const comTecnicas = stands
      .filter((s) => s.tecnicas?.length > 0)
      .map((s) => `${s.nome}(${s.tecnicas.length})`);
    console.log("   com técnicas:", comTecnicas.join(", ") || "nenhum");

    const todas = stands.flatMap((s) => s.tecnicas ?? []);
    const vazias = todas.filter((t) => !t.descricao).length;
    console.log(`   técnicas: ${todas.length}, sem descrição: ${vazias}`);
  } catch (e) {
    console.log(`Parte ${n}: ${e.message}`);
  }
}