export function getHumanType(type: number) {
  switch (type) {
    case 1:
      return "Producer sale";
    case 2:
      return "Affiliate sale";
    case 3:
      return "Commission paid";
    case 4:
      return "Commission received";
  }
}
