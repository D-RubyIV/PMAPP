



interface IProvince {
    ProvinceID: string,
    ProvinceName: string,
}

interface IDistrict {
    DistrictID: string,
    DistrictName: string,
}

interface IWard {
    WardCode: string,
    WardName: string,
}
interface IAddress {
    iprovince?: IProvince | undefined,
    idistrict?: IDistrict | undefined,
    iward?: IWard | undefined
}