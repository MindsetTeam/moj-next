export const placeFormat = ({
  houseNum,
  streetNum,
  commune,
  village,
  district,
  province,
} = {}) => {
  return [
    houseNum && `ផ្ទះលេខ ${houseNum}`,
    streetNum && `ផ្លូវ ${streetNum}`,
    village && `ភូមិ ${village} `,
    commune && `ឃុំ ${commune}`,
    district && `ស្រុក/ខណ្ឌ ${district}`,
    province && `រាជធានី/ខេត្ត ${province}`,
  ].join(" ");
};
