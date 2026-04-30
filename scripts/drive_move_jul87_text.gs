/**
 * 搬移 87 張七月疊字版 到「視覺底圖」資料夾 + 設權限
 * 在 Apps Script 裡執行 moveTextVersions()
 *
 * 已經跑過搬移會自動跳過（檔案已經在目標資料夾就不再搬）
 */

const TARGET_FOLDER_ID = '15rYYJ5ZEJ6rTYEy_QthJuEAf6OU652D9';

const JUL87_TEXT = [
  ["d03","16x9","1HeE5SBI3sLwyX9daWRp9TMTIW32ye2xs"],
  ["d03","1x1","1HDukFK2QUZ3XYobC5muOBFGY2MNbLhYI"],
  ["d03","9x16","1ahisftLXuJqR_VeJWnk-QU5kSVuksAln"],
  ["d04","16x9","1zvkymlZrrFYn3VwFzgBKR5CS9nVSrYzR"],
  ["d04","1x1","1AQQW7BQP9TuK10WDWkMW87Et_loxX8Ls"],
  ["d04","9x16","1eFHiArwQh6CJoDb6IF_ADVTakwAhLS-3"],
  ["d05","16x9","1pPUhJQlIdiX0gB7-QDk9Nie84E83Q_rM"],
  ["d05","1x1","1D6okM5KXpR49NUnbeOGkHvkHsyxitvJv"],
  ["d05","9x16","1z0G8rBaEsaXBKajqhtsXnajfI6E10q5F"],
  ["d06","16x9","11HCWm4Cr-Bms2_au0Z5K-FQoC42BaHYH"],
  ["d06","1x1","1x0NtyUebYTS18czyaXWQuHzmnz-KYa1X"],
  ["d06","9x16","1WSYZnZBHfB3VB3gEMzV2QazQGkiXf6lz"],
  ["d07","16x9","1HUvlvSdqfmQl9DrHPL-AwMMxj_cW2yke"],
  ["d07","1x1","1pk7kNOv0Fdsh1Oj_jY0yPr_D8HssSS1s"],
  ["d07","9x16","1x16X13_XXH7TV2BmGIE3zprYKLQTttMg"],
  ["d08","16x9","1b-JYa-zfD_xipt1_kaREl9giBrcw8VzI"],
  ["d08","1x1","1RzSGb8QVDIHD7eBxox3_WHUhJTUvl1Ed"],
  ["d08","9x16","15kIiqlnb_Gm6IXJYhGgDppauMlfubxFx"],
  ["d09","16x9","1BfAYHGOKfmsOWGrSDAr0oAFuMkSrdDx_"],
  ["d09","1x1","1qDiEwUxXbHi0nH8PDBp-nBqoMlbEZCXb"],
  ["d09","9x16","1WR-mkHpzX-aZPePa6-vHUwqiPm9GQm_i"],
  ["d10","16x9","1WFKoFRDTjWWvcOsnx3pKy_ft8VtO1DK_"],
  ["d10","1x1","1qGYIXHoHnod-oB54JC5T0IP_2OJzJVI7"],
  ["d10","9x16","1DnWNwtEA7x4_sWWjtSn9ZAg2zZTbjJwl"],
  ["d11","16x9","1QgGdSES43z4R1n4upyHrV6fIo69pGhVy"],
  ["d11","1x1","13jLIiIb09IwpfkYaZM00CXJXSmXCGcnZ"],
  ["d11","9x16","1EZudgCdIQPck_LEG8OYxMqgpEfEpIm8r"],
  ["d12","16x9","1xiX4MMfhNc9wcygsCUZ4BBPmwqUSgrDQ"],
  ["d12","1x1","14Wg5c9gBrJKahwUUG2Ttp_wcaOf_HJj_"],
  ["d12","9x16","1Fnctdiv2MC6drDqrdiVvBWquBrg5ZeZh"],
  ["d13","16x9","1rKYRVJVRLUXD5FB6CtKIa_7_bJHXC6sG"],
  ["d13","1x1","1l6dmpk6KKphMqio0nilSv4NaxHAHMXfh"],
  ["d13","9x16","1qj1To-DU8zxKVQLvhqCHYMdAvhq3VjP1"],
  ["d14","16x9","19BsMg8r6D316fFjE4eN4qf0z0RMlsggU"],
  ["d14","1x1","10Uyg1VntuMjEYNAPQR5Nc-Jtt47dBU2g"],
  ["d14","9x16","17HXc3L8VNtY-ghD8i1aQQy7_R5Ts5J7N"],
  ["d15","16x9","1JRqNxIHgKp_CKysEoxm4KcRJP4vwR8tA"],
  ["d15","1x1","1G-vMDZpEKChcYGPJiZ9OOXGjtofl06qy"],
  ["d15","9x16","15LLHFRhji4ELSRl1TzBlPCU8b5HfbJIF"],
  ["d16","16x9","1cYWM2ACEkYmZbYp1ExHEtZ-hjMnVMNJN"],
  ["d16","1x1","1f08hSoYDheL6znXeYZ0JXdF-znHL76o_"],
  ["d16","9x16","1gwW-cu9FF6fg9UyCds-Zj4BaeURIoVq_"],
  ["d17","16x9","122xL9QMbCmNAf2als1WXH4BaS5Y_YoBT"],
  ["d17","1x1","1f5r3W6hu7oIOLYZ8OMYSZJtDEkcvde9l"],
  ["d17","9x16","1xuWVx7wOv5ur8mvyKqrCfo7sJ2kMMp49"],
  ["d18","16x9","1joCxHHK1RLqkSakkhh-YAnYv_ECVQPEB"],
  ["d18","1x1","1B-_TLKyacHyRuTWXHR9-3TfWhxdHe0i_"],
  ["d18","9x16","1XP0gXXIufq9fvGGPaOIHdWJ-ajiJBWbq"],
  ["d19","16x9","1N9onR3PNH4NinLNq9yZNf-_dSzQCILu9"],
  ["d19","1x1","1lr1vKREyN_8QqR_8GFYhEcFjZbIsKh5F"],
  ["d19","9x16","1txbt75tIaF-7Zjg3iq6s1ylrcmKAIww4"],
  ["d20","16x9","12xG4A5-PlGBicBfeX0E6u8B9qAtquy36"],
  ["d20","1x1","1qEiDK150vA4aSuJKgbJ55XMyVwvCPUzc"],
  ["d20","9x16","1qlwu3n1TdY2z38FRw0ywG5uHTl1ySOH4"],
  ["d21","16x9","18jCqZhLn08ydvUabWYnrSX9qqTAPQXVG"],
  ["d21","1x1","1tw5iwdxtwSLxEMQAT2tlr8ADeOz34nFq"],
  ["d21","9x16","12MNmepzUaXNJ-KmallWXN6fo8aSDnAGQ"],
  ["d22","16x9","1eXns_fZ8AW4my4kisgQAxs3QZgHqkTgW"],
  ["d22","1x1","1Yz6wUR8L3GeG1oKdPLpRvUotshWuqAXK"],
  ["d22","9x16","1twHvIamatZaMkcMwvzC_bgxa1FitFDrS"],
  ["d23","16x9","1WX9khmFSMPkKFAQgT2LzviyqAo_ZLVHl"],
  ["d23","1x1","1xxojHGZXMBK8bVGWUCpH4TD2sIs6I7GF"],
  ["d23","9x16","1CTHijUhpd_oIcX1SzbR7e_q_ru8Pg1Sk"],
  ["d24","16x9","1awbVtudIn2nxeKVLMf98Xds39XbBrN9i"],
  ["d24","1x1","1v7bWYaOg9eJf-W0avHaBx0LA4Inm6iz5"],
  ["d24","9x16","1EcvXR75vgz1cAqjJ_0ELwKMPLaQCJzot"],
  ["d25","16x9","1WtIo1nDutppWn2LDGvFWUMrss7rZ-wDZ"],
  ["d25","1x1","14xHKPmm4WBANiM_6Kwx-G7XMtR5eUapk"],
  ["d25","9x16","1Yv_eWfUQW_YwjCBEmfzO8t6juVj9DL7o"],
  ["d26","16x9","1w3WC2GnxXBzFCeuqJKZsaEHCHSQ2FJ7U"],
  ["d26","1x1","1n28XdT0JcHM936mrAfjil4NtBEEgkJ6E"],
  ["d26","9x16","1BKgl7HUil2FvIo4i1Ze9TbPLFX75Nikm"],
  ["d27","16x9","1MIeEymYvuMQLz2WEmWlo4quXq4VkAr4w"],
  ["d27","1x1","1-ntyY9C0Omaok2RRBrZl2BhmaKJcN3h3"],
  ["d27","9x16","1-G98SrGMccneAK3tJmpUin8Drx3r_Miz"],
  ["d28","16x9","1lFXy6yxq546tH7Nr0wE27PHOpxz39_eh"],
  ["d28","1x1","1zk04dSvrdgKFRPS9tyozxlh-fuJQgpP4"],
  ["d28","9x16","1xUVbUJ-3n6uGjSOYgK5Oy0n9aCJEqycL"],
  ["d29","16x9","1HCsszN4OOsVKqeHKJsKhGhHTGLn3Sccd"],
  ["d29","1x1","175YkOft6tQNg1tro_CBPAqp1ZOV7QJYe"],
  ["d29","9x16","1UE67MsnWQfQBLYMVK36M6RAGEvrzdyBN"],
  ["d30","16x9","1BqNt923A9smHwlMHPwyYNLfMwfuoNEkj"],
  ["d30","1x1","10YBWNWLC3efeRpnDrWnfDUWO1xuuUFiy"],
  ["d30","9x16","1KrYgREVp0fPO_c7bo883-tVmTn-W8i-Z"],
  ["d31","16x9","1wCD58Fdl0Eh3X6CdwaE2KBdUI-aIQ2Sq"],
  ["d31","1x1","1GbK0paZBFKZh3gUFJNZjwmWpy4RCbL-e"],
  ["d31","9x16","15VQGdv8C0tU-J6mBEE0gb21-KTj94PD5"]
];

function moveTextVersions() {
  const targetFolder = DriveApp.getFolderById(TARGET_FOLDER_ID);
  Logger.log('目標資料夾：' + targetFolder.getName() + ' (' + targetFolder.getUrl() + ')');

  let movedCount = 0;
  let permCount = 0;
  let skippedCount = 0;
  let failCount = 0;

  for (const [day, ratio, fileId] of JUL87_TEXT) {
    try {
      const file = DriveApp.getFileById(fileId);

      // 檢查是否已經在目標資料夾
      let inTarget = false;
      const parents = file.getParents();
      while (parents.hasNext()) {
        const p = parents.next();
        if (p.getId() === TARGET_FOLDER_ID) { inTarget = true; break; }
      }

      if (!inTarget) {
        // 從原 parents 移除、加到目標資料夾
        const oldParents = file.getParents();
        while (oldParents.hasNext()) {
          const p = oldParents.next();
          if (p.getId() !== TARGET_FOLDER_ID) p.removeFile(file);
        }
        targetFolder.addFile(file);
        movedCount++;
      } else {
        skippedCount++;
      }

      // 設權限：知道連結的人皆可檢視
      try {
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        permCount++;
      } catch (pe) {
        Logger.log('權限失敗 ' + day + '_' + ratio + ': ' + pe);
      }
    } catch (e) {
      failCount++;
      Logger.log('FAIL ' + day + '_' + ratio + ' (' + fileId + '): ' + e);
    }
  }

  Logger.log('搬移完成：' + movedCount + ' / ' + JUL87_TEXT.length + '（已存在跳過：' + skippedCount + '）');
  Logger.log('權限設定：' + permCount + ' / ' + JUL87_TEXT.length);
  if (failCount > 0) Logger.log('失敗：' + failCount);
}
