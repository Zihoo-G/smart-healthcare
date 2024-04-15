package micro_service.service;

import sy.es.EsUtil;
import utils.PropertiesReader;

/**
 * @author sy
 * @date 2022/7/21 20:22
 */
public class EsUtilService {

    public static void main(String...args) {
        // build mapping and insert data

        buildMapping();
//        String medicalJson = EsUtilService.class.getClassLoader().getResource(PropertiesReader.get("medical")).getPath().replaceFirst("/", "");
//        String medicalJson = "F:\\桌面\\code\\medical_treatment\\intelligent_medical\\src\\main\\resources\\medical\\medical.json";
//        insertData(PropertiesReader.get("medical_index"), medicalJson);


//        String medicalJson = EsUtilService.class.getClassLoader().getResource(PropertiesReader.get("disease_complete")).getPath().replaceFirst("/", "");
        String medicalJson = "F:\\桌面\\code\\medical_treatment\\intelligent_medical\\src\\main\\resources\\disease_completion\\disease_process.json";
        insertData(PropertiesReader.get("disea_comple_index"), medicalJson);
    }

    /**
     * build es mapping
     */
    public static void buildMapping() {
        String mappingFile = "F:\\桌面\\code\\medical_treatment\\intelligent_medical\\src\\main\\resources\\es_scheme\\disease_completion_mapping.json";
//        String mappingFile = PropertiesReader.get("medical_mapping");
//        mappingFile = EsUtilService.class.getClassLoader().getResource(mappingFile).getPath().replaceFirst("/", "");
        EsUtil.buildIndexMapping(mappingFile);
    }

    /**
     * build es mapping
     * @param mapJsonPath
     */
    public static void buildMapping(String mapJsonPath) {
        EsUtil.buildIndexMapping(mapJsonPath);
    }

    /**
     * insert json data to es
     * @param index
     * @param jsonFilePath
     */
    public static void insertData(String index, String jsonFilePath) {
        EsUtil.insertData2Es(index, jsonFilePath);
    }

}
