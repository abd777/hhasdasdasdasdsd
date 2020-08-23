<template>
<div></div>
</template>
<script>
export default {
    mounted(){
              this.$vs.loading();
      this.$store
        .dispatch("auth/signOut")
        .then(() => {
          this.$vs.loading.close();
          this.$router.push("/pages/login");
        })
        .catch((err) => {
          this.$vs.loading.close();
          console.log(err);
        });
    }
};
</script>

<style>
</style>