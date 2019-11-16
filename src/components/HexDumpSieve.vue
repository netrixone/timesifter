<template>
    <div id="hex-dump-carver" class="grid">
        <div class="form-group">
            <label for="hex-dump">hex dump sieve:</label>
            <div id="hex-dump" v-html="hexDump"></div>
            <button class="btn btn-primary btn-block"
                    disabled="disabled">
                find timestamps
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import hexy from 'hexy'

    @Component
    export default class HexDumpSieve extends Vue {
        hexDump: string = hexy.hexy(' '.repeat(16) + 'not implemented yet' + ' '.repeat(13), {
            format: "twos",
            html: true,
        });
    }
</script>

<style lang="scss">
    #hex-dump-carver .form-group {
        width: 60rem;

        label {
            display: block;
        }

        #hex-dump {
            clear: both;
            text-align: left;
            font-family: monospace;
            white-space: pre;
            width: 100%;
            line-height: 0.8em;
        }
    }
</style>
