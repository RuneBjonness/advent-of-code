import { AocPuzzle } from "@/aoc-puzzle";

const silver = (input: string): number => {
  let bits = input
    .split("")
    .map((hex) => toBinary(hex))
    .join("");

  let packet = parsePacketAt(bits, 0);

  return packet.packetVersionSum;
};

const gold = (input: string): number => {
  let bits = input
    .split("")
    .map((hex) => toBinary(hex))
    .join("");

  let packet = parsePacketAt(bits, 0);
  return packet.value;
};

export const day16 = new AocPuzzle(2021, 16, silver, gold);

function toBinary(hex: string): string {
  return parseInt(hex, 16).toString(2).padStart(4, "0");
}

function parsePacketAt(
  s: string,
  idx: number,
): {
  version: number;
  type: number;
  value: number;
  nextIndex: number;
  packetVersionSum: number;
} {
  let v = parseInt(s.substring(idx, idx + 3), 2);
  idx += 3;

  let t = parseInt(s.substring(idx, idx + 3), 2);
  idx += 3;

  let packetVersionSum = v;

  if (t == 4) {
    let binaryVal = "";
    let lastGroup = false;
    while (!lastGroup) {
      lastGroup = s[idx] == "0";
      binaryVal += s.substring(idx + 1, idx + 5);
      idx += 5;
    }
    return {
      version: v,
      type: t,
      value: parseInt(binaryVal, 2),
      nextIndex: idx,
      packetVersionSum: packetVersionSum,
    };
  }

  let subPackets = [];
  let l = 0;
  if (s[idx] == "0") {
    l = parseInt(s.substring(idx + 1, idx + 16), 2);
    idx += 16;
    while (l > 0) {
      let sp = parsePacketAt(s, idx);
      subPackets.push(sp);
      l = l - (sp.nextIndex - idx);
      idx = sp.nextIndex;
      packetVersionSum += sp.packetVersionSum;
    }
  } else {
    l = parseInt(s.substring(idx + 1, idx + 12), 2);
    idx += 12;
    while (l > 0) {
      let sp = parsePacketAt(s, idx);
      subPackets.push(sp);
      idx = sp.nextIndex;
      l--;
      packetVersionSum += sp.packetVersionSum;
    }
  }

  let packetValue = 0;
  if (subPackets.length == 1) {
    packetValue = subPackets[0].value;
  } else if (t == 0) {
    packetValue = subPackets.map((p) => p.value).reduce((a, b) => a + b);
  } else if (t == 1) {
    packetValue = subPackets.map((p) => p.value).reduce((a, b) => a * b);
  } else if (t == 2) {
    packetValue = Math.min(...subPackets.map((p) => p.value));
  } else if (t == 3) {
    packetValue = Math.max(...subPackets.map((p) => p.value));
  } else if (t == 5) {
    packetValue = subPackets[0].value > subPackets[1].value ? 1 : 0;
  } else if (t == 6) {
    packetValue = subPackets[0].value < subPackets[1].value ? 1 : 0;
  } else if (t == 7) {
    packetValue = subPackets[0].value == subPackets[1].value ? 1 : 0;
  }

  return {
    version: v,
    type: t,
    value: packetValue,
    nextIndex: idx,
    packetVersionSum: packetVersionSum,
  };
}
