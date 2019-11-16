<template>
    <div id="app" class="container">
        <h1 class="pull-left">Timesifter: microtime carver</h1>

        <Knobs/>

        <div class="grid">
            <div id="ts-converter" class="card cell -3of12">
                <header class="card-header">Number --> ISO string converter</header>
                <NumberToStringConverter/>
            </div>
            <div id="iso-converter" class="card cell -3of12">
                <header class="card-header">ISO string --> number converter</header>
                <StringToNumberConverter/>
            </div>
        </div>

        <HexDumpSieve/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Knobs from '@/components/Knobs.vue';
    import NumberToStringConverter from '@/components/NumberToStringConverter.vue';
    import StringToNumberConverter from '@/components/StringToNumberConverter.vue';
    import HexDumpSieve from '@/components/HexDumpSieve.vue';

    @Component({
        components: {
            HexDumpSieve: HexDumpSieve,
            Knobs,
            NumberToStringConverter,
            StringToNumberConverter,
        },
    })
    export default class App extends Vue {
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0;
    }

    h1 {
        font-size: 1.3em;
        line-height: 1em;
    }
</style>
