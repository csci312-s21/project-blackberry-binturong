import Layout from "../components/Layout.js";
import styles from "../styles/Main.module.css";

export default function About() {
  return (
    <Layout title="About | WRMC 91.1 FM">
      <div className={styles.about_div}>
        <div>
          <h3>About</h3>
        </div>
        <div>
          WRMC is located at Middlebury College, in Middlebury, Vermont, and is
          entirely student-run. We are dedicated to providing a diverse range of
          alternative programming both locally, to the Champlain Valley, and
          internationally, to the far-reaching Middlebury College community. In
          a time when college radio stations are becoming less prevalent, we
          strive to demonstrate the value of the truly unique medium that is
          small college radio.
          <br />
          <br />
          WRMC is licensed by the Federal Communications Commission and operates
          on the assigned frequency of 91.1 MHz with an effective radiated power
          of 2,900 watts. WRMC is a member of the National Federation of
          Community Broadcasters and a subscribing member of the Associated
          Press.
          <br />
          <br />
        </div>

        <div>
          <h3>Contact Info</h3>
          <p>
            <b>Mailing Address:</b>
            <br />
            WRMC 91.1 FM
            <br />
            Middlebury College
            <br />
            Middlebury, VT 05753
            <br />
            <br />
            <b>Request Line:</b> 802.443.6323
            <br />
            <br />
            <b>Business Office:</b> 802.493.6324
            <br />
            <br />
            <b>Music Department:</b> 802.443.6324
            <br />
            Music Directors for Spring 2021: George Werner and Dan Frazo.
            <br />
            <br />
            <b>General Inquiries:</b> wrmc911@gmail.com
            <br />
            <br />
            <i>
              WRMC 91.1 FM accepts all press releases, promotional items, music,
              etc.
            </i>
          </p>
        </div>
      </div>
    </Layout>
  );
}
