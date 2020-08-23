<template>
  <section class="footer-bg pt-5">
    <b-container class="pb-5">
      <b-row align-h="center">
        <b-col xl="6">
          <b-row>
            <b-col xl="6">
              <img src="/logo.png" style="max-height:27px" />
              <p
                class="M-font text-dark pt-4"
                style="font-size:15px"
              >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ratione aliquid laborum aspernatur reprehenderit. Placeat, iusto? Quibusdam adipisci ip</p>
            </b-col>
            <b-col xl="6">&nbsp;</b-col>
          </b-row>
        </b-col>
        <b-col xl="6">
          <b-row align-h="center">
            <b-col
              xl="3"
              md="3"
              class="p"
              sm="6"
              cols="6"
              v-for="(item, index) in footerItems"
              :key="index"
            >
              <h5 class="text-dark M-font">{{item.heading}}</h5>
              <ul class="M-font pt-4" style="list-style:none;padding:0px;margin:0px">
                <template v-for="(ite, inde) in item.links">
                  <li :key="inde" class="py-1">
                    <a :href="ite.link" class="link text-capitalize">{{ite.title}}</a>
                  </li>
                </template>
              </ul>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <div style="border-top:1px solid #dadada;">
      <b-container class="py-3 copyright-sec">
        <b-row>
          <b-col
            xl="6"
            offset-xl="6"
            class="text-muted text-lg-right M-font"
          >Happy Sewa USA Inc. @2020. All Rights Reserved.</b-col>
        </b-row>
      </b-container>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      footerItems: [
        {
          heading: "General",
          links: [
            {
              title: "about us",
              link: "/about",
            },
            {
              title: "about us",
              link: "/about",
            },
            {
              title: "about us",
              link: "/about",
            },
            {
              title: "about us",
              link: "/about",
            },
          ],
        },
        {
          heading: "Support",
          links: [
            {
              title: "contact",
              link: "/contact",
            },
            {
              title: "contact",
              link: "/contact",
            },
            {
              title: "contact",
              link: "/contact",
            },
            {
              title: "contact",
              link: "/contact",
            },
            {
              title: "contact",
              link: "/contact",
            },
            {
              title: "contact",
              link: "/contact",
            },
          ],
        },
        {
          heading: "Account",
          links: [
            {
              title: "Sign Up",
              link: "/",
            },
            {
              title: "Sign Up",
              link: "/",
            },
            {
              title: "Sign Up",
              link: "/",
            },
            {
              title: "Sign Up",
              link: "/",
            },
          ],
        },
        {
          heading: "Follow Us",
          links: [
            {
              title: "Facebook",
              link: "/about",
            },
            {
              title: "Twitter",
              link: "/about",
            },
            {
              title: "Instagram",
              link: "/about",
            },
            {
              title: "Linked In",
              link: "/about",
            },
            {
              title: "Youtube",
              link: "/about",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.footer-bg {
  /* background-image: url("/footer-bg.png");
  background-repeat: no-repeat; */
  background-color: #ffffff;
  border-top: 1px solid black;
}
@media (min-width: 1300px) {
  .footer-bg {
    background-size: cover;
    background-position: center;
  }
}

@media (max-width: 1300px) {
  .footer-bg {
    background-size: cover;
    background-position: center;
  }
}
@media (max-width: 1200px) {
  .copyright-sec {
    text-align: center;
    background: black;
  }
}
.link {
  font-size: 15px;
  color: #2c2c2c;
  text-decoration: none;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
}
.link:hover {
  color: #ffcd75 !important;
}
</style>