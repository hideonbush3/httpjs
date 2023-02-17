const oracledb = require("../models/Oracle");

class Sungjuk {
  // 생성자 정의 - 변수 초기화
  // 즉, 매개변수로 전달된 값을 클래스 멤버변수에 대입
  constructor(name, kor, eng, mat, tot, avg, grd) {
    this.name = name;
    this.kor = kor;
    this.eng = eng;
    this.mat = mat;
    this.tot = tot;
    this.avg = avg;
    this.grd = grd;
  }

  // 성적 저장
  async insert() {
    let conn = null;
    let sql =
      "insert into sungjuk (no, name, kor, eng, mat, tot, avg, grd) values (sjno.nextval, :1, :2, :3, :4, :5, :6, :7)";
    let params = [
      this.name,
      this.kor,
      this.eng,
      this.mat,
      this.tot,
      this.avg,
      this.grd,
    ];

    try {
      conn = await oracledb.makeConn();
      let result = await conn.execute(sql, params);
      await conn.commit(); // insert 할때 반드시 필요!
      console.log(result);
    } catch (e) {
      console.error(e);
    } finally {
      await oracledb.closeConn(conn);
    }
  }

  // 성적 조회
  select() {}
  // 성적 상세조회
  selectOne(no) {}
}
module.exports = Sungjuk;
