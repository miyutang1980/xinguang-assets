/**
 * 八月疊字版 84 張：搬到「視覺底圖」資料夾 + 設「知道連結就能看」
 * 獨立 namespace AUG84_TEXT_ITEMS 避免與七月腳本衝突
 */
const AUG84_TEXT_ITEMS = [
  {name: "row08_aug_d01_16x9_v5_text.png", id: "1xWXaqnjdqQrMgHrxSUF8Z3K-g0HqglPT"},
  {name: "row08_aug_d01_1x1_v5_text.png", id: "17UCVB5WmAgtE2RapDEf5MjkzNITk9-C_"},
  {name: "row08_aug_d01_9x16_v5_text.png", id: "1FFvLkMWqkSYA3xODLq1Eg6LgUnP2B01F"},
  {name: "row08_aug_d02_16x9_v5_text.png", id: "1cnoca4z20XLjSJbj6WUzkFudcuCafXjR"},
  {name: "row08_aug_d02_1x1_v5_text.png", id: "1tCNe01tS3NW4507TiluNPAIuMG9xY6yv"},
  {name: "row08_aug_d02_9x16_v5_text.png", id: "1AXvY-Qpa07_J8bBs0Pf47aUG2cgAmzVc"},
  {name: "row08_aug_d03_16x9_v5_text.png", id: "1zuGtPIm1xFy60sRaQvqDeXN2BofDaYSV"},
  {name: "row08_aug_d03_1x1_v5_text.png", id: "1QOklXWahMKhMknoENNFpHCfx7oYi3YSM"},
  {name: "row08_aug_d03_9x16_v5_text.png", id: "1JYPIqrfKW-rN8h8cS8ufos257uNokxFY"},
  {name: "row08_aug_d04_16x9_v5_text.png", id: "1d_AK_Gr6H5kpCFYKc72ziC5ElnY_syTK"},
  {name: "row08_aug_d04_1x1_v5_text.png", id: "1wMIOZNHPe8WDD45cOTydo8bVe_yPy0CK"},
  {name: "row08_aug_d04_9x16_v5_text.png", id: "18mbFpr3z4SewHaUQ5WSeshOm_l89f40y"},
  {name: "row08_aug_d05_16x9_v5_text.png", id: "1FCCKzHhr3Ag-tGUlwPe3NkQhAlfFBeFk"},
  {name: "row08_aug_d05_1x1_v5_text.png", id: "1K7CDXqtybbnITkEL8X5-aY6ftM5fJqLo"},
  {name: "row08_aug_d05_9x16_v5_text.png", id: "1VAd4fIkzDdE-bCtIJ60OdJYunvI2Eutk"},
  {name: "row08_aug_d06_16x9_v5_text.png", id: "1DdsfKnuKfwwArWAytd6AC5Ms2jvWxnJX"},
  {name: "row08_aug_d06_1x1_v5_text.png", id: "1njdIUIWGd3j31t2VMscj3gYGUvesM9S4"},
  {name: "row08_aug_d06_9x16_v5_text.png", id: "1Q0EN7Cwt9B7PfZrsA_jJYQIOpjsOnYOF"},
  {name: "row08_aug_d07_16x9_v5_text.png", id: "1LXfABawdSMIUsJvMhQdLDsvuVlvZzbPS"},
  {name: "row08_aug_d07_1x1_v5_text.png", id: "1qRg6N5MPAVrwyGxiq1_61h-9rHmseGam"},
  {name: "row08_aug_d07_9x16_v5_text.png", id: "1iyKdjBKf68FL1GnCnBbEIjRxAy6abDbn"},
  {name: "row08_aug_d08_16x9_v5_text.png", id: "1ccp50R9DGxhyCO2uX2cXo6WjbYoAM9S2"},
  {name: "row08_aug_d08_1x1_v5_text.png", id: "1NSjzjLLjrKn0IL-N3CjvUlYnz1qlnpv6"},
  {name: "row08_aug_d08_9x16_v5_text.png", id: "1xlOoVKAK_jfRmTsl8GPBG_stwbcCPNdd"},
  {name: "row08_aug_d09_16x9_v5_text.png", id: "1QGAaQN0KCVXWeZdUKhhrCs3MjAZMGAzg"},
  {name: "row08_aug_d09_1x1_v5_text.png", id: "1H8KWuyHBlZmYV3lLr6xY9xQKqXrNfoh-"},
  {name: "row08_aug_d09_9x16_v5_text.png", id: "107HN6qb2i8jqgSIQhE-9iFOZW5-KmHms"},
  {name: "row08_aug_d10_16x9_v5_text.png", id: "1v6pPKXhF2ecOqMPCco4J9Beam1FxD_GV"},
  {name: "row08_aug_d10_1x1_v5_text.png", id: "1xywSEUaioWf0MhF3L9vkXtyolbuUGBcQ"},
  {name: "row08_aug_d10_9x16_v5_text.png", id: "1b4dCU0OtFxEttSeIMT3f9saSExzKaGjY"},
  {name: "row08_aug_d11_16x9_v5_text.png", id: "1sglcOKRpfbGuR6zbt_cyVpZY7ei4b_bT"},
  {name: "row08_aug_d11_1x1_v5_text.png", id: "10pHuH6n3VeGwk5zKmvVIFDlcmQ2scd7O"},
  {name: "row08_aug_d11_9x16_v5_text.png", id: "1YQnXp4QzRzcb4rAOqQHFYvXwwtO0KpKg"},
  {name: "row08_aug_d12_16x9_v5_text.png", id: "1LT6-T_WXhO5pl4piXf4ajDsB-8tmN9qo"},
  {name: "row08_aug_d12_1x1_v5_text.png", id: "13NPc6Swzo3SRDgCsBe7yOuqPbLcVWI5l"},
  {name: "row08_aug_d12_9x16_v5_text.png", id: "1DFm72fO06LNud-7ybNz-B6yfz5JNtFh0"},
  {name: "row08_aug_d13_16x9_v5_text.png", id: "1l_lNKrGwC3VLMoWXWkcCjvL82_qrE17u"},
  {name: "row08_aug_d13_1x1_v5_text.png", id: "1qx9gYFQ2urFwGOSPJB62d42kg1Mk5r0O"},
  {name: "row08_aug_d13_9x16_v5_text.png", id: "1zjEDJftUtwQAeXlw70WlWhjpAtYaYU38"},
  {name: "row08_aug_d14_16x9_v5_text.png", id: "1hK0ywMqhQBjnn9WihOWxycEBIZ-ChgMW"},
  {name: "row08_aug_d14_1x1_v5_text.png", id: "1D-jNxHgQWUMu2n-FjDtKYKWRZpDVssvT"},
  {name: "row08_aug_d14_9x16_v5_text.png", id: "19oHUwJcathpVOq2A-dSXS2jd6midPEPz"},
  {name: "row08_aug_d15_16x9_v5_text.png", id: "1v6d7fzokG5kvHCre7VjN-cx0Kx-OSKNY"},
  {name: "row08_aug_d15_1x1_v5_text.png", id: "1L8Q5OomCrk3ryqocBqL_oKJ3O7gTKWOt"},
  {name: "row08_aug_d15_9x16_v5_text.png", id: "1gfSSCicuMmC_3WaRid-YtsogInBfdSAj"},
  {name: "row08_aug_d16_16x9_v5_text.png", id: "1Q7zbRMw4T4HFWOxHU5rBhDbMNkuIDJjA"},
  {name: "row08_aug_d16_1x1_v5_text.png", id: "1jDZg2nTCHseDfdfGR2BFz2soLXAiA28n"},
  {name: "row08_aug_d16_9x16_v5_text.png", id: "16PiDkpL-ZlJbNdwoaX-M4bhBEIUphTP4"},
  {name: "row08_aug_d17_16x9_v5_text.png", id: "1ksd_VzMcfv1MyKt3RytjtKLnQnZzbshx"},
  {name: "row08_aug_d17_1x1_v5_text.png", id: "1Agaxd9NUwrT2OdyCHZS5R0d3JR696LUR"},
  {name: "row08_aug_d17_9x16_v5_text.png", id: "1YUMn-e2NJXP-LggPt8Tns836X8A5e1kE"},
  {name: "row08_aug_d18_16x9_v5_text.png", id: "1PvsNm7uQOe4EZVk7bFoSe-gu_gkFw5pH"},
  {name: "row08_aug_d18_1x1_v5_text.png", id: "1CsL_Axe8z6kYbHNehzV9xGlCGRBFJkTm"},
  {name: "row08_aug_d18_9x16_v5_text.png", id: "1YDG_4vgSp040HgimK03x7B_ZQTta9Apt"},
  {name: "row08_aug_d19_16x9_v5_text.png", id: "1xMbBlSOSZIx9YaPzt-YxfNRSVYYW2wZK"},
  {name: "row08_aug_d19_1x1_v5_text.png", id: "180Maf8ggLW85i1SCVLOsq8J1N_lBM94T"},
  {name: "row08_aug_d19_9x16_v5_text.png", id: "1Y2iRXiEQ0A7dD1bSrs_LxK3tCuH49TIE"},
  {name: "row08_aug_d20_16x9_v5_text.png", id: "17eyqK6tJJPXc6PIilZAlKZCDApRUxKuP"},
  {name: "row08_aug_d20_1x1_v5_text.png", id: "11i4f0hM6f1HWD_rLw-gNtoAw6vQx-wNf"},
  {name: "row08_aug_d20_9x16_v5_text.png", id: "1w8q4YtSVIQ30neib2jS9KPu41h5FggjL"},
  {name: "row08_aug_d21_16x9_v5_text.png", id: "1Gl9pAOnEeXncRh1BNnzuT_x7WyAxqDj3"},
  {name: "row08_aug_d21_1x1_v5_text.png", id: "1kz5co5VhOx8dYboCr3cBQRd-OIT_TEdB"},
  {name: "row08_aug_d21_9x16_v5_text.png", id: "1m73Sfy2qBmolTSvF8OVBb20tA-XhePRn"},
  {name: "row08_aug_d22_16x9_v5_text.png", id: "1_PVzuL9zb5M4SF9bMp5D0YHfCU_gokbn"},
  {name: "row08_aug_d22_1x1_v5_text.png", id: "17Rvn_DpgA7HX5P5zVqvW1ASljIiU65ay"},
  {name: "row08_aug_d22_9x16_v5_text.png", id: "103bziDUXZMD-mBtj19XURnqGUEPWXaQR"},
  {name: "row08_aug_d23_16x9_v5_text.png", id: "1qhhYAJhAjQW41atbSlo82pGZeWPMeBdW"},
  {name: "row08_aug_d23_1x1_v5_text.png", id: "1CiYnYOGsKwQayC4XrudVHs3k4tnoNCIo"},
  {name: "row08_aug_d23_9x16_v5_text.png", id: "1nXz2lT4Jq-lQzcSPw6M_O3OfDla1GRAU"},
  {name: "row08_aug_d24_16x9_v5_text.png", id: "1FGCCCRDTmmAkEzrx2Cmf8ajxMVITZjte"},
  {name: "row08_aug_d24_1x1_v5_text.png", id: "1riIOFph8QlN_zdX5NpBv-yfNniaxCabq"},
  {name: "row08_aug_d24_9x16_v5_text.png", id: "1S4lZ6xr7uzcyWGuyrmnKv2LdZskKezSE"},
  {name: "row08_aug_d25_16x9_v5_text.png", id: "1TOCvMHEqXWW205X4844plN1Y5j_Uskh_"},
  {name: "row08_aug_d25_1x1_v5_text.png", id: "1i6Z6qYOmHToF82fC_NdJrIPkdWg6ZHBY"},
  {name: "row08_aug_d25_9x16_v5_text.png", id: "1v0amexwZ-1q4lX7wLWfxrFFpsSLctvVc"},
  {name: "row08_aug_d26_16x9_v5_text.png", id: "1D-Op7O78tpzsVk3Hj0PAHhsgxYlkD5-C"},
  {name: "row08_aug_d26_1x1_v5_text.png", id: "1oaAcle7BmNiz-k_Exx5pUAe3fzdc19ox"},
  {name: "row08_aug_d26_9x16_v5_text.png", id: "1vKAPjuekamE2DKxbB8XFxVzn9sU1-Bd4"},
  {name: "row08_aug_d27_16x9_v5_text.png", id: "1T1zjb3VFxg887MO-qCBtTI2tN1av0Wg3"},
  {name: "row08_aug_d27_1x1_v5_text.png", id: "14uerbj5Mn5cvT4_8ZVEnltgnxlx9UA1F"},
  {name: "row08_aug_d27_9x16_v5_text.png", id: "1_jI42CwUn409isQOQ6FDbht7tHszuZxO"},
  {name: "row08_aug_d28_16x9_v5_text.png", id: "1Rc4CF9rkjhdVrEIhQ8Jq5mJV3l2RK9ds"},
  {name: "row08_aug_d28_1x1_v5_text.png", id: "12UMFBl-AMYut24cxfRD9bfFTMzRqLH3e"},
  {name: "row08_aug_d28_9x16_v5_text.png", id: "1ISnQ8zxIrK_KwZaPCbzr8iuxXWLxyGWf"}
];

function moveAug84TextVersions() {
  const folderId = "15rYYJ5ZEJ6rTYEy_QthJuEAf6OU652D9"; // 視覺底圖
  const target = DriveApp.getFolderById(folderId);
  let moved = 0, perm = 0, fail = 0;
  for (const it of AUG84_TEXT_ITEMS) {
    try {
      const file = DriveApp.getFileById(it.id);
      // 從原資料夾移除（根目錄），加到目標
      const parents = file.getParents();
      while (parents.hasNext()) parents.next().removeFile(file);
      target.addFile(file);
      moved++;
      // 設權限
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      perm++;
    } catch (e) {
      fail++;
      Logger.log("FAIL " + it.name + ": " + e.message);
    }
  }
  const msg = `搬移 ${moved}/${AUG84_TEXT_ITEMS.length}、權限 ${perm}/${AUG84_TEXT_ITEMS.length}、失敗 ${fail}`;
  Logger.log(msg);
  SpreadsheetApp.getUi().alert(msg);
}
